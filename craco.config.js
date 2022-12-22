const path = require('path');
const CracoAlias = require('craco-alias');
module.exports = {
	webpack: {
		alias: {
			'@': path.resolve(__dirname, 'src/'),
			'@components/*': path.resolve(__dirname, 'src/components'),
			'@views/*': path.resolve(__dirname, 'src/views'),
			'@styles/*': path.resolve(__dirname, 'src/styles')
		}
	},
	jest: {
		configure: {
			moduleNameMapper: {
				'^@(.*)$': '<rootDir>/src$1'
			}
		}
	},
	plugins: [
		{
			plugin: CracoAlias,
			options: {
				source: 'tsconfig',
				baseUrl: '.',
				tsConfigPath: './tsconfig.path.json'
			}
		}
	]
};
