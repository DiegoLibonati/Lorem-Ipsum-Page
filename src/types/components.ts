export interface Component {
  cleanup?: () => void;
}

export interface ParagraphComponent extends Component, HTMLParagraphElement {}
