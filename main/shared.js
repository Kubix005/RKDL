function getPoints(rank) {
    const maxPoints = 400;
    const minPoints = 1;
    const maxRank = 150;
    const multiplier = Math.pow(minPoints / maxPoints, 1 / (maxRank - 1));

    return Math.round(maxPoints * Math.pow(multiplier, rank - 1));
}