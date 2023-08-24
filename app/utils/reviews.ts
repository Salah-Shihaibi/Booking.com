export function mapScoreToDescription(score: number) {
  switch (score) {
    case 1:
      return "Poor";
    case 2:
      return "Fair";
    case 3:
      return "Average";
    case 4:
      return "Good";
    case 5:
      return "Excellent";
    default:
      return "Invalid score";
  }
}
