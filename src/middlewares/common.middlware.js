export const ensureRequestBody = (request, response, next) => {
    request.body = request.body || {};
    next();
};
