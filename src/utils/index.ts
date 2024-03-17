import { makeGithubProfileUrl } from "./makeGithubProfileUrl";
import { makeGithubPullRequestUrl } from "./makeGithubPullRequestUrl";
import { getRandomIndex } from "./getRandomIndex";
import { flattenLanguagesEdges } from "./flattenLanguagesEdges";
import { getTotalSizesByLanguages } from "./getTotalSizesByLanguages";
import { makeYoutubeUrl } from "./makeYoutubeUrl";
import { makeLinkeinUrl } from "./makeLinkeinUrl";
import { makeInstagramUrl } from "./makeInstagramUrl";
import { makeFacebookUrl } from "./makeFacebookUrl";
import { formatNumber } from "./formatNumber";
import { arrayMoveImmutable, arrayMoveMutable } from "./arrayMoveImmutable";
import { getIndex } from "./getIndex";

const Url = {
    makeLinkeinUrl: makeLinkeinUrl,
    makeYoutubeUrl: makeYoutubeUrl,
    makeFacebookUrl: makeFacebookUrl,
    makeInstagramUrl: makeInstagramUrl,
    makeGithubProfileUrl: makeGithubProfileUrl,
    makeGithubPullRequestUrl: makeGithubPullRequestUrl,
};

const Languages = {
    flattenLanguagesEdges: flattenLanguagesEdges,
    getTotalSizesByLanguages: getTotalSizesByLanguages,
};

const Random = {
    getRandomIndex: getRandomIndex,
};

const Array = {
    arrayMoveMutable: arrayMoveMutable,
    arrayMoveImmutable: arrayMoveImmutable,
    getIndex: getIndex,
};

const Locale = {
    formatNumber: formatNumber,
};

export { Url, Languages, Locale, Random, Array };
