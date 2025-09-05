export class SwitchButtonManager {
  constructor() {
    this.initialize();
  }

  initialize() {
    const switchComponents = document.querySelectorAll('.prj-content-sort-switch-button-component');
    switchComponents.forEach(component => {
      const switchButtons = component.querySelectorAll('button');
      switchButtons.forEach(button => {
        button.addEventListener('click', () => this.handleButtonClick(button, switchButtons));
      });
    });
  }

  handleButtonClick(clickedButton, allButtons) {
    allButtons.forEach(button => button.classList.remove('is-active'));
    clickedButton.classList.add('is-active');
  }
}