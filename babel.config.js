module.exports = function(api) {
    api.cache(true);
    return {
        presets: ['babel-preset-expo'], // ensures React Native + JSX support
    };
};