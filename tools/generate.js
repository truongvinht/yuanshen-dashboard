const { generateTemplateFilesCommandLine } = require('generate-template-files');

generateTemplateFilesCommandLine([
    // Generate model
    // Generate API
    {
        option: 'Create API',
        defaultCase: '(pascalCase)',
        entry: {
            folderPath: './tools/templates',
        },
        stringReplacers: ['__model__'],
        output: {
            path: './tools/generated',
            pathAndFileNameDefaultCase: '(pascalCase)',
            overwrite: true
        },
        onComplete: (results) => {
            console.log(`results`, results);
        },
    }
]);