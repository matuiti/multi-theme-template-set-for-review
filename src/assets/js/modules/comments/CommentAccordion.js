/**
 * コメントの返信表示を制御するアコーディオン機能を管理するクラス
 * 返信があるコメントに対して、展開/折りたたみのアニメーション付き表示を制御します
 */
export class CommentAccordion {
  /**
   * コメントアコーディオン機能を初期化
   * 全てのアコーディオンボタンにイベントリスナーを設定し、初期状態を設定します
   */
  initialize() {
    try {
      // 返信アコーディオンボタンを全て取得
      const accordionButtons = document.querySelectorAll('.prj-comment-accordion-button');

      // ボタンが存在しない場合は静かに終了（エラーにしない）
      if (accordionButtons.length === 0) {
        return;
      }

      // 各ボタンに対して初期化処理を実行
      accordionButtons.forEach((button, index) => {
        try {
          // クリックイベントリスナーを設定
          button.addEventListener('click', (event) => {
            event.stopPropagation();
            this.handleAccordionClick(button);
          });

          // 初期状態を設定
          this.setInitialState(button);
        } catch (error) {
          console.error(`ボタン${index + 1}の初期化でエラー:`, error);
        }
      });

    } catch (error) {
      console.error('コメントアコーディオンの初期化で予期しないエラーが発生しました:', error);
    }
  }

  /**
   * アコーディオンボタンのクリックイベントを処理
   * @param {HTMLElement} button - クリックされたアコーディオンボタン要素
   */
  handleAccordionClick(button) {
    // 親のコメントコンポーネントを取得
    const commentComponent = button.closest('.prj-comment-component');
    if (!commentComponent) {
      return;
    }

    // 返信があるかチェック
    if (!commentComponent.classList.contains('has-responses')) {
      return;
    }

    // 返信コンテナを取得
    const responseContainer = commentComponent.querySelector('.prj-comment-responses');
    if (!responseContainer) {
      return;
    }

    // 現在の展開状態を取得
    const isExpanded = button.getAttribute('aria-expanded') === 'true';

    // アコーディオンの開閉を実行
    this.toggleAccordion(button, responseContainer, isExpanded);
  }

  /**
   * アコーディオンの開閉状態を切り替え
   * @param {HTMLElement} button - アコーディオンボタン要素
   * @param {HTMLElement} container - 返信コンテナ要素
   * @param {boolean} isExpanded - 現在の展開状態
   */
  toggleAccordion(button, container, isExpanded) {
    const icon = button.querySelector('.material-symbols-outlined');
    const commentAccordion = button.closest('.prj-comment-accordion');

    // 現在の状態に応じて開閉処理を実行
    if (isExpanded) {
      this.closeAccordion(button, container, icon, commentAccordion);
    } else {
      this.openAccordion(button, container, icon, commentAccordion);
    }
  }

  /**
   * アコーディオンを開く
   * @param {HTMLElement} button - アコーディオンボタン要素
   * @param {HTMLElement} container - 返信コンテナ要素
   * @param {HTMLElement} icon - アイコン要素
   * @param {HTMLElement} commentAccordion - アコーディオン要素
   */
  openAccordion(button, container, icon, commentAccordion) {
    // 展開状態を設定
    button.setAttribute('aria-expanded', 'true');
    if (commentAccordion) {
      commentAccordion.classList.add('active');
    }
    if (icon) {
      icon.textContent = 'keyboard_arrow_up';
    }

    // アニメーション用の初期状態を設定
    container.style.visibility = 'visible';
    container.style.opacity = '0';

    // アニメーションを実行
    setTimeout(() => {
      try {
        // コンテナの高さを設定（余裕を持たせて設定）
        container.style.maxHeight = `${container.scrollHeight + 20 + 1000}px`;
        container.style.opacity = '1';
      } catch (error) {
        // エラー時はアニメーションなしで表示
        container.style.maxHeight = 'none';
        container.style.opacity = '1';
      }
    }, 10);
  }

  /**
   * アコーディオンを閉じる
   * @param {HTMLElement} button - アコーディオンボタン要素
   * @param {HTMLElement} container - 返信コンテナ要素
   * @param {HTMLElement} icon - アイコン要素
   * @param {HTMLElement} commentAccordion - アコーディオン要素
   */
  closeAccordion(button, container, icon, commentAccordion) {
    // 閉じた状態を設定
    button.setAttribute('aria-expanded', 'false');
    if (commentAccordion) {
      commentAccordion.classList.remove('active');
    }
    if (icon) {
      icon.textContent = 'keyboard_arrow_down';
    }

    // アニメーション用の初期状態を設定
    container.style.maxHeight = '0';
    container.style.opacity = '0';

    // トランジション完了時の処理を設定
    container.addEventListener('transitionend', function handleTransitionEnd(event) {
      if (event.target === container && container.style.maxHeight === '0px') {
        container.style.visibility = 'hidden';
      }
      container.removeEventListener('transitionend', handleTransitionEnd);
    });
  }

  /**
   * アコーディオンの初期状態を設定
   * @param {HTMLElement} button - アコーディオンボタン要素
   */
  setInitialState(button) {
    // 親のコメントコンポーネントを取得
    const commentComponent = button.closest('.prj-comment-component');
    if (!commentComponent || !commentComponent.classList.contains('has-responses')) return;

    // 返信コンテナを取得
    const responseContainer = commentComponent.querySelector('.prj-comment-responses');
    if (!responseContainer) return;

    // トランジション設定
    responseContainer.style.transition = 'transform 0.4s ease, max-height 0.3s ease, opacity 0.3s ease, visibility 0.3s ease';

    // aria-expanded属性が設定されていない場合はfalseを設定
    if (!button.hasAttribute('aria-expanded')) {
      button.setAttribute('aria-expanded', 'false');
    }

    // 必要な要素を取得
    const icon = button.querySelector('.material-symbols-outlined');
    const commentAccordion = button.closest('.prj-comment-accordion');

    // HTMLのaria-expanded属性の値に基づいて初期状態を設定
    const isInitiallyExpanded = button.getAttribute('aria-expanded') === 'true';
    if (isInitiallyExpanded) {
      this.openAccordion(button, responseContainer, icon, commentAccordion);
    } else {
      this.closeAccordion(button, responseContainer, icon, commentAccordion);
    }
  }
}