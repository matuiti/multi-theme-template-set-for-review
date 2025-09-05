export class ToggleButtonManager {
  constructor() {
    this.initialize();
  }

  initialize() {
    this.initializeLikeButtons();
    this.initializeBookmarkButtons();
  }

  initializeLikeButtons() {
    const selectors = [
      '.prj-card-like-button',
      '.prj-card-article-head-like-button',
      '.prj-article-content-favorite .prj-article-content-action-button'
    ];
    this.toggleClassOnEventSelectors(selectors);
  }

  initializeBookmarkButtons() {
    const selectors = [
      '.prj-card-bookmark-button',
      '.prj-card-article-head-bookmark-button',
      '.prj-article-content-bookmark .prj-article-content-action-button'
    ];
    this.toggleClassOnEventSelectors(selectors);
  }

  toggleClassOnEventSelectors(selectors, className = 'active', eventName = 'click') {
    selectors.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(element => {
        element.addEventListener(eventName, () => {
          element.classList.toggle(className);
        });
      });
    });
  }
}