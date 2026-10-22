function getPoints(rank) {
    const maxPoints = 350;
    const minPoints = 1;
    const maxRank = 50;
    const multiplier = Math.pow(minPoints / maxPoints, 1 / (maxRank - 1));

    return Math.round(maxPoints * Math.pow(multiplier, rank - 1));
}

function isLegacyLevel(level) {
    return level?.legacy === true ||
        String(level?.legacy ?? "").trim().toLowerCase() === "true";
}

function parseProgressValue(value) {
    if (Array.isArray(value)) {
        if (value.length === 0) {
            return null;
        }

        const progressValues = value.map(parseProgressValue);

        if (progressValues.some(progressValue => !progressValue)) {
            return null;
        }

        return combineProgressValues(progressValues);
    }

    if (typeof value === "number" && Number.isFinite(value) && value >= 0 && value <= 100) {
        return {
            start: 0,
            end: value,
            reverseGradient: false,
            label: `${value}%`
        };
    }

    if (typeof value !== "string") {
        return null;
    }

    const normalizedValue = value.trim();
    const percentageMatch = normalizedValue.match(/^(\d+(?:\.\d+)?)$/);

    if (percentageMatch) {
        const percentage = Number(percentageMatch[1]);

        if (percentage <= 100) {
            return {
                start: 0,
                end: percentage,
                reverseGradient: false,
                label: `${percentage}%`
            };
        }
    }

    const rangeMatch = normalizedValue.match(/^(\d+(?:\.\d+)?)\s*-\s*100$/);

    if (!rangeMatch) {
        return null;
    }

    const start = Number(rangeMatch[1]);

    if (!Number.isFinite(start) || start < 0 || start >= 100) {
        return null;
    }

    return {
        start,
        end: 100,
        reverseGradient: true,
        label: `${start}-100%`
    };
}

function combineProgressValues(progressValues) {
    const sortedSegments = progressValues
        .flatMap(progressValue => progressValue.segments || [{
            start: progressValue.start,
            end: progressValue.end,
            reverseGradient: progressValue.reverseGradient
        }])
        .sort((a, b) => a.start - b.start || a.end - b.end);
    const segments = [];

    sortedSegments.forEach(segment => {
        const lastSegment = segments[segments.length - 1];

        if (!lastSegment || segment.start > lastSegment.end) {
            segments.push({ ...segment });
        } else {
            lastSegment.end = Math.max(lastSegment.end, segment.end);
            lastSegment.reverseGradient =
                lastSegment.reverseGradient || segment.reverseGradient;
        }
    });

    return {
        start: segments[0].start,
        end: segments[segments.length - 1].end,
        segments,
        label: [...new Set(progressValues.map(progressValue => progressValue.label))]
            .join(" + ")
    };
}