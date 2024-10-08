const nextConfig = {
    webpack: (config) => {
        // Убедитесь, что конфигурация обрабатывает только нужные файлы
        config.module.rules.push({
            test: /\.html$/,
            use: 'html-loader',
        });

        return config;
    },
    images: {
        domains: ['lh3.googleusercontent.com'], // Add allowed image domain
    },
};

export default nextConfig;
