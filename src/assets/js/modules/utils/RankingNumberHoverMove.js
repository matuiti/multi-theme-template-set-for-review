export class RankingNumberHoverMove {
  constructor() {
    this.initialize();
  }

  initialize() {
    const cards = document.querySelectorAll('.prj-card-component.card.card-hover');
    cards.forEach(card => this.setupCardHoverEffect(card));
  }

  setupCardHoverEffect(card) {
    const rankingNumber = card.previousElementSibling;
    if (!rankingNumber?.classList.contains('ranking-number')) return;

    const initialTransform = window.getComputedStyle(rankingNumber).transform;
    const defaultTransform = initialTransform !== 'none' ? initialTransform : 'translateY(-50%)';

    card.addEventListener('mouseenter', () => this.handleMouseEnter(rankingNumber, defaultTransform));
    card.addEventListener('mouseleave', () => this.handleMouseLeave(rankingNumber, defaultTransform));
  }

  handleMouseEnter(rankingNumber, defaultTransform) {
    rankingNumber.style.transition = 'transform 0.3s ease';
    if (defaultTransform.includes('translateY(-50%)')) {
      rankingNumber.style.transform = 'translateY(calc(-50% - 0.25rem))';
    } else {
      rankingNumber.style.transform = `${defaultTransform} translateY(-0.25rem)`;
    }
  }

  handleMouseLeave(rankingNumber, defaultTransform) {
    rankingNumber.style.transform = defaultTransform;
  }
}