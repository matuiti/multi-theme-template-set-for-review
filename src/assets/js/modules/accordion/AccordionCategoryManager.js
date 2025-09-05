// グローバルスコープでaccordionManagersを宣言
let accordionManagers = {};

/**
 * アコーディオン別状態管理クラス
 */
export class AccordionCategoryManager {
  constructor(accordionId, containerElement = null) {
    this.accordionId = accordionId;
    this.containerElement = containerElement || document;
    this.accordionElement = null;
    this.pcComponent = null;
    this.spComponent = null;
    this.isModalComponent = false;

    // アコーディオン別の状態管理変数
    this.activeParentByRow = {};
    this.activeChildByParentRow = {};

    // デバッグ用フラグ
    this.debug = true;

    this.findCorrectAccordionElements();
  }

  log(message, ...args) {
    if (this.debug) {
      console.log(`[${this.accordionId}] ${message}`, ...args);
    }
  }

  /**
   * 正しいアコーディオン要素を特定（コンテナ対応版）
   */
  findCorrectAccordionElements() {
    // 指定されたコンテナ内でのみPC版コンポーネントを検索
    const allPcComponents = this.containerElement.querySelectorAll('.prj-filter-category-pc-component');

    let foundPcComponent = null;
    let correctAccordionElement = null;
    let modalComponent = null;
    let modalAccordionElement = null;

    // 各PC版コンポーネントをチェックして、このアコーディオンIDに関連するものを探す
    allPcComponents.forEach((component) => {
      const nearestDataContent = component.closest('[data-content]');
      if (nearestDataContent && nearestDataContent.getAttribute('data-content') === this.accordionId) {

        // 表示状態をチェック
        const isVisible = this.isElementVisible(component);

        // モーダル内の要素かどうかをチェック
        const isInModal = component.closest('.prj-modal-category-component') !== null;

        if (isInModal) {
          // モーダル内の要素は別途保存
          modalComponent = component;
          modalAccordionElement = nearestDataContent;
        } else if (!foundPcComponent && isVisible) {
          // モーダル外で表示中の要素を優先
          foundPcComponent = component;
          correctAccordionElement = nearestDataContent;
        } else if (!foundPcComponent) {
          // 表示されていないが、モーダル外の要素を次候補として保存
          foundPcComponent = component;
          correctAccordionElement = nearestDataContent;
        }
      }
    });

    // 優先順位：1.モーダル外の表示中要素 > 2.モーダル外の非表示要素 > 3.モーダル内要素
    if (foundPcComponent && correctAccordionElement) {
      this.pcComponent = foundPcComponent;
      this.accordionElement = correctAccordionElement;
    } else if (modalComponent && modalAccordionElement) {
      this.pcComponent = modalComponent;
      this.accordionElement = modalAccordionElement;
      // モーダル内の場合は特別な初期化を行う
      this.isModalComponent = true;
    } else {
      // PC版が見つからない場合はコンテナ内でアコーディオン要素のみ取得
      this.accordionElement = this.containerElement.querySelector(`[data-content="${this.accordionId}"]`);
    }

    // SP版コンポーネントを検索
    if (this.accordionElement) {
      this.spComponent = this.accordionElement.querySelector('.prj-filter-category-sp-component');
    }

    // モーダル内コンポーネントの場合は遅延初期化
    if (this.isModalComponent) {
      this.setupModalInitialization();
    } else {
      this.initializePC();
      this.initializeSP();
    }
  }

  /**
   * 要素が実際に表示されているかをチェック
   */
  isElementVisible(element) {
    const style = getComputedStyle(element);
    const rect = element.getBoundingClientRect();

    return (
      style.display !== 'none' &&
      style.visibility !== 'hidden' &&
      style.opacity !== '0' &&
      rect.width > 0 &&
      rect.height > 0
    );
  }

  /**
   * モーダル内コンポーネントの特別な初期化
   */
  setupModalInitialization() {
    // MutationObserverでモーダルの表示状態を監視
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' &&
          (mutation.attributeName === 'style' || mutation.attributeName === 'class')) {

          const modalContainer = this.pcComponent.closest('.prj-modal-category-component');
          if (modalContainer && this.isElementVisible(modalContainer)) {
            // モーダルが表示されたら初期化を実行
            this.initializePC();
            this.initializeSP();

            // 一度初期化したら監視を停止
            observer.disconnect();
          }
        }
      });
    });

    // モーダルコンテナを監視
    const modalContainer = this.pcComponent.closest('.prj-modal-category-component');
    if (modalContainer) {
      observer.observe(modalContainer, {
        attributes: true,
        attributeFilter: ['style', 'class']
      });

      // すでに表示されている場合は即座に初期化
      if (this.isElementVisible(modalContainer)) {
        this.initializePC();
        this.initializeSP();
        observer.disconnect();
      }
    }
  }

  /**
   * PC向け機能の初期化（display:noneでも強制実行）
   */
  initializePC() {
    if (!this.pcComponent) {
      return;
    }

    // display:noneでもquerySelectorAllは動作するので、強制的に初期化
    const parentToggles = this.pcComponent.querySelectorAll('[data-pc-toggle^="parent-"]');
    const childElements = this.pcComponent.querySelectorAll('[data-pc-child]');

    // 親カテゴリボタンにイベントリスナーを追加
    parentToggles.forEach((toggle) => {
      const toggleValue = toggle.getAttribute('data-pc-toggle');

      toggle.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.handlePCParentToggle(toggle);
      });
    });

    // 子カテゴリボタンにイベントリスナーを追加
    childElements.forEach((childElement) => {
      const childValue = childElement.getAttribute('data-pc-child');

      childElement.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.handlePCChildClick(childElement);
      });
    });
  }

  /**
   * SP向け機能の初期化
   */
  initializeSP() {
    if (!this.spComponent) {
      return;
    }

    // 【重要】このアコーディオンが担当するdata-content範囲内のボタンのみを対象にする
    const targetDataContent = `[data-content="${this.accordionId}"]`;
    const accordionScope = this.containerElement.querySelector(targetDataContent);

    if (!accordionScope) {
      return;
    }

    // 担当範囲内のSP版コンポーネントのみを対象
    const scopedSpComponent = accordionScope.querySelector('.prj-filter-category-sp-component');

    if (!scopedSpComponent) {
      return;
    }

    // 担当範囲内でのみSP親カテゴリボタンを検索
    const spParentToggles = scopedSpComponent.querySelectorAll('[data-sp-toggle^="parent-"]');

    spParentToggles.forEach((toggle) => {
      const toggleValue = toggle.getAttribute('data-sp-toggle');

      // 既にイベントリスナーが設定されているかチェック
      if (toggle._accordionManagerId) {
        return;
      }

      // このマネージャーの管理下であることをマーク
      toggle._accordionManagerId = `${this.containerElement.className}-${this.accordionId}`;

      // 既存のイベントリスナーを削除
      const newToggle = toggle.cloneNode(true);
      toggle.parentNode.replaceChild(newToggle, toggle);

      // 管理情報を復元
      newToggle._accordionManagerId = toggle._accordionManagerId;

      newToggle.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.handleSPParentToggle(newToggle);
      });
    });

    // 担当範囲内でのみSP子カテゴリボタンを検索
    const spChildToggles = scopedSpComponent.querySelectorAll('[data-sp-toggle^="child-"]');

    spChildToggles.forEach((toggle) => {
      const toggleValue = toggle.getAttribute('data-sp-toggle');

      // 既にイベントリスナーが設定されているかチェック
      if (toggle._accordionManagerId) {
        return;
      }

      // このマネージャーの管理下であることをマーク
      toggle._accordionManagerId = `${this.containerElement.className}-${this.accordionId}`;

      // 既存のイベントリスナーを削除
      const newToggle = toggle.cloneNode(true);
      toggle.parentNode.replaceChild(newToggle, toggle);

      // 管理情報を復元
      newToggle._accordionManagerId = toggle._accordionManagerId;

      newToggle.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.handleSPChildToggle(newToggle);
      });
    });
  }

  /**
   * PC向け親カテゴリの開閉処理
   */
  handlePCParentToggle(toggle) {
    const parentId = toggle.getAttribute('data-pc-toggle');
    const rowId = toggle.getAttribute('data-pc-row');

    // 同じ親カテゴリを再度クリックした場合（トグル動作で閉じる）
    if (this.activeParentByRow[rowId] === parentId) {
      this.activeParentByRow[rowId] = null;

      // UIを非アクティブ状態に更新
      const icon = toggle.querySelector('[data-pc-icon]');
      if (icon) {
        icon.classList.remove('rotate-180');
      }
      toggle.classList.remove('active');

      // 対応する展開エリアを取得（アコーディオン要素全体から検索）
      const expandedArea = this.accordionElement.querySelector(
        `[data-pc-expanded-content="${parentId}"][data-pc-expanded-row="${rowId}"]`
      );
      if (expandedArea) {
        expandedArea.classList.add('hidden');
        this.log(`展開エリアを非表示: ${parentId}-${rowId}`);
      } else {
        this.log(`展開エリアが見つかりません: [data-pc-expanded-content="${parentId}"][data-pc-expanded-row="${rowId}"]`);
      }

      // 関連する子カテゴリの状態もリセット
      if (this.activeChildByParentRow[`${parentId}-${rowId}`]) {
        delete this.activeChildByParentRow[`${parentId}-${rowId}`];
      }
    }
    // 切り替え動作の処理
    else {
      this.log(`親カテゴリを開く処理: ${parentId}`);

      // 前にアクティブだった親カテゴリがあれば非アクティブ化
      if (this.activeParentByRow[rowId]) {
        const prevParentId = this.activeParentByRow[rowId];
        this.log(`前の親カテゴリを非アクティブ化: ${prevParentId}`);

        // 前の親カテゴリのUIを非アクティブに（アコーディオン要素全体から検索）
        const prevToggle = this.accordionElement.querySelector(
          `[data-pc-toggle="${prevParentId}"][data-pc-row="${rowId}"]`
        );
        if (prevToggle) {
          const prevIcon = prevToggle.querySelector('[data-pc-icon]');
          if (prevIcon) prevIcon.classList.remove('rotate-180');
          prevToggle.classList.remove('active');
        }

        // 前の展開エリアを非表示（アコーディオン要素全体から検索）
        const prevExpandedArea = this.accordionElement.querySelector(
          `[data-pc-expanded-content="${prevParentId}"][data-pc-expanded-row="${rowId}"]`
        );
        if (prevExpandedArea) {
          prevExpandedArea.classList.add('hidden');
        }

        // 前の親カテゴリに関連する子カテゴリの状態もリセット
        if (this.activeChildByParentRow[`${prevParentId}-${rowId}`]) {
          delete this.activeChildByParentRow[`${prevParentId}-${rowId}`];
        }
      }

      // 新しい親カテゴリをアクティブ化
      this.activeParentByRow[rowId] = parentId;

      // 新しい親カテゴリのUIをアクティブに
      const icon = toggle.querySelector('[data-pc-icon]');
      if (icon) {
        icon.classList.add('rotate-180');
      }
      toggle.classList.add('active');

      // 新しい展開エリアを表示（アコーディオン要素全体から検索）
      const newExpandedArea = this.accordionElement.querySelector(
        `[data-pc-expanded-content="${parentId}"][data-pc-expanded-row="${rowId}"]`
      );
      if (newExpandedArea) {
        newExpandedArea.classList.remove('hidden');
        this.log(`展開エリアを表示: ${parentId}-${rowId}`);
      } else {
        this.log(`展開エリアが見つかりません: [data-pc-expanded-content="${parentId}"][data-pc-expanded-row="${rowId}"]`);
      }
    }
  }

  /**
   * PC向け子カテゴリのクリック処理
   */
  handlePCChildClick(childElement) {
    const childId = childElement.getAttribute('data-pc-child');
    const rowNum = childElement.getAttribute('data-pc-row');
    const icon = childElement.querySelector('[data-pc-child-icon]');

    this.log(`PC子カテゴリ処理開始: childId="${childId}", rowNum="${rowNum}"`);

    // 親カテゴリIDを抽出
    const parentId = childId.split('-').slice(0, 2).join('-');
    this.log(`抽出された親カテゴリID: ${parentId}`);

    // 孫カテゴリエリアを取得（アコーディオン要素全体から検索）
    const grandchildContent = this.accordionElement.querySelector(
      `[data-pc-grandchild-content="${childId}"]`
    );

    if (!grandchildContent) {
      this.log(`孫カテゴリエリアが見つかりません: [data-pc-grandchild-content="${childId}"]`);
      return;
    }

    this.log(`孫カテゴリエリアが見つかりました:`, grandchildContent);

    // 状態管理のための複合キー
    const rowKey = `${parentId}-${rowNum}`;
    this.log(`状態管理キー: ${rowKey}`);
    this.log(`現在のactiveChildByParentRow:`, this.activeChildByParentRow);

    // 同じ子カテゴリを再度クリックした場合（トグル動作で閉じる）
    if (this.activeChildByParentRow[rowKey] === childId) {
      this.log(`同じ子カテゴリを閉じる処理: ${childId}`);
      this.activeChildByParentRow[rowKey] = null;

      // UIを非アクティブ状態に更新
      if (icon) {
        icon.classList.remove('rotate-180');
        this.log('子カテゴリアイコンの回転を解除');
      }
      childElement.classList.remove('active');
      grandchildContent.classList.add('hidden');
      this.log('孫カテゴリエリアを非表示');
    }
    // 切り替え動作の処理
    else {
      this.log(`子カテゴリを開く処理: ${childId}`);

      // 前にアクティブだった子カテゴリがあれば非アクティブ化
      if (this.activeChildByParentRow[rowKey]) {
        const prevChildId = this.activeChildByParentRow[rowKey];
        this.log(`前の子カテゴリを非アクティブ化: ${prevChildId}`);

        // アコーディオン要素全体から前の子要素を取得
        const prevChildElement = this.accordionElement.querySelector(`[data-pc-child="${prevChildId}"]`);

        if (prevChildElement) {
          prevChildElement.classList.remove('active');
          const prevIcon = prevChildElement.querySelector('[data-pc-child-icon]');
          if (prevIcon) prevIcon.classList.remove('rotate-180');
        }

        // 前の孫カテゴリエリアを非表示（アコーディオン要素全体から検索）
        const prevGrandchildContent = this.accordionElement.querySelector(
          `[data-pc-grandchild-content="${prevChildId}"]`
        );
        if (prevGrandchildContent) {
          prevGrandchildContent.classList.add('hidden');
        }
      }

      // 新しい子カテゴリをアクティブ化
      this.activeChildByParentRow[rowKey] = childId;

      // 新しい子カテゴリのUIをアクティブに
      if (icon) {
        icon.classList.add('rotate-180');
        this.log('子カテゴリアイコンを回転');
      }
      childElement.classList.add('active');
      grandchildContent.classList.remove('hidden');
      this.log('孫カテゴリエリアを表示');
    }

    this.log(`PC子カテゴリ処理完了。新しいactiveChildByParentRow:`, this.activeChildByParentRow);
  }

  /**
   * SP向け親カテゴリの開閉処理
   */
  handleSPParentToggle(toggle) {
    const parentId = toggle.getAttribute('data-sp-toggle');

    // メソッドレベルでの重複実行防止
    const executionKey = `sp-parent-${parentId}-${this.accordionId}`;
    const now = Date.now();

    if (!window._accordionExecutionTracker) {
      window._accordionExecutionTracker = {};
    }

    const lastExecuted = window._accordionExecutionTracker[executionKey] || 0;

    if (now - lastExecuted < 300) { // 300ms以内の重複実行を防止
      this.log(`メソッドレベル重複実行を防止: ${parentId} (前回から${now - lastExecuted}ms)`);
      return;
    }

    window._accordionExecutionTracker[executionKey] = now;
    this.log(`SP親カテゴリ処理: ${parentId}`);

    // アイコン回転でUI状態を更新
    const icon = toggle.querySelector('[data-sp-icon]');
    if (icon) {
      icon.classList.toggle('rotate-180');
      this.log('SPアイコンをトグル');
    }
    toggle.classList.toggle('active');

    // 対応する子カテゴリエリアを取得（アコーディオン要素全体から検索）
    const childContent = this.accordionElement.querySelector(`[data-sp-content="${parentId}"]`);
    if (childContent) {
      const isHidden = childContent.classList.contains('hidden');
      this.log(`SP子カテゴリエリア状態: ${isHidden ? '非表示' : '表示'}`);

      if (isHidden) {
        childContent.classList.remove('hidden');
        this.log('SP子カテゴリエリアを表示');
      } else {
        childContent.classList.add('hidden');
        this.log('SP子カテゴリエリアを非表示');

        // 閉じるときはその中の孫カテゴリもすべて閉じる
        const grandchildContents = childContent.querySelectorAll(
          '.prj-filter-category-sp-grandchild-content'
        );
        grandchildContents.forEach((gcContent) => {
          gcContent.classList.add('hidden');
        });

        // 子カテゴリのアイコンもすべて元に戻す
        const childIcons = childContent.querySelectorAll(
          '.prj-filter-category-sp-child-header [data-sp-icon]'
        );
        childIcons.forEach((childIcon) => {
          childIcon.classList.remove('rotate-180');
        });
      }
    } else {
      this.log(`SP子カテゴリエリアが見つかりません: [data-sp-content="${parentId}"]`);
    }
  }

  /**
   * SP向け子カテゴリの開閉処理
   */
  handleSPChildToggle(toggle) {
    const childId = toggle.getAttribute('data-sp-toggle');
    this.log(`SP子カテゴリ処理: ${childId}`);

    // 重複実行防止機能
    const now = Date.now();
    const lastExecuted = toggle._lastSPChildExecuted || 0;

    if (now - lastExecuted < 200) { // 200ms以内の重複実行を防止
      this.log(`重複実行を防止しました: ${childId} (前回実行から${now - lastExecuted}ms)`);
      return;
    }
    toggle._lastSPChildExecuted = now;

    this.log(`SP子カテゴリ処理: ${childId}`);

    // アイコン回転でUI状態を更新
    const icon = toggle.querySelector('[data-sp-icon]');
    if (icon) {
      icon.classList.toggle('rotate-180');
      this.log('SP子カテゴリアイコンをトグル');
    }

    // 対応する孫カテゴリエリアを取得（アコーディオン要素全体から検索）
    const grandchildContent = this.accordionElement.querySelector(`[data-sp-content="${childId}"]`);
    if (grandchildContent) {
      const isHidden = grandchildContent.classList.contains('hidden');
      this.log(`SP孫カテゴリエリア状態: ${isHidden ? '非表示' : '表示'}`);

      if (isHidden) {
        grandchildContent.classList.remove('hidden');
        this.log('SP孫カテゴリエリアを表示');
      } else {
        grandchildContent.classList.add('hidden');
        this.log('SP孫カテゴリエリアを非表示');
      }
    } else {
      this.log(`SP孫カテゴリエリアが見つかりません: [data-sp-content="${childId}"]`);
    }
  }

  /**
   * このアコーディオンの状態をリセット
   */
  resetState() {
    // PC版の状態をリセット（アコーディオン要素全体から）
    if (this.accordionElement) {
      this.accordionElement.querySelectorAll('[data-pc-icon]').forEach((icon) => {
        icon.classList.remove('rotate-180');
      });

      this.accordionElement.querySelectorAll('[data-pc-expanded-content]').forEach((content) => {
        content.classList.add('hidden');
      });

      this.accordionElement.querySelectorAll('[data-pc-grandchild-content]').forEach((content) => {
        content.classList.add('hidden');
      });

      this.accordionElement.querySelectorAll('[data-pc-child]').forEach((child) => {
        child.classList.remove('active');
      });

      this.accordionElement.querySelectorAll('[data-pc-toggle^="parent-"]').forEach((toggle) => {
        toggle.classList.remove('active');
      });

      // SP版の状態をリセット（アコーディオン要素全体から）
      this.accordionElement.querySelectorAll('[data-sp-icon]').forEach((icon) => {
        icon.classList.remove('rotate-180');
      });

      this.accordionElement.querySelectorAll('[data-sp-content]').forEach((content) => {
        content.classList.add('hidden');
      });

      this.accordionElement.querySelectorAll('[data-sp-toggle^="parent-"]').forEach((toggle) => {
        toggle.classList.remove('active');
      });
    }

    // 状態管理変数のリセット
    this.activeParentByRow = {};
    this.activeChildByParentRow = {};
  }
}