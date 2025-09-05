// 責務：アコーディオンヘッダーのトグル処理
export class AccordionToggleHandler {
  static handleToggle(header, content, dataToggle) {
    if (!content) return;

    content.classList.toggle('hidden');

    const icon = header.querySelector('[data-icon]');
    if (icon) {
      icon.classList.toggle('rotate-180');
    }

    header.classList.toggle('active');

    this.dispatchToggleEvent(header, dataToggle, !content.classList.contains('hidden'));
  }

  static dispatchToggleEvent(header, dataToggle, isOpen) {
    try {
      const customEvent = new CustomEvent('accordionToggle', {
        detail: {
          toggleValue: dataToggle,
          isOpen,
          method: 'auto-fix'
        }
      });
      header.dispatchEvent(customEvent);
    } catch (error) {
      console.warn('アコーディオントグルイベントの発火に失敗しました:', error);
    }
  }
}