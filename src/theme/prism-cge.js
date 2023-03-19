Prism.languages.cge = {
	'comment': {
		pattern: /\/\/.*|\/\*[\s\S]*?(?:\*\/|$)/,
		greedy: true
	},
  'keyword': /\b(?:name |version |config|event |command |type |enum )\b/,
  'constant': {
    pattern: /(((?<=(version)\s+)\d+.\d+\b)|((?<=(name)\s+)\w+\b))/,
    greedy: true
  },
  'class-name': {
    pattern: /(?<=(command|event|type|enum)\s+)\w+\b/,
    greedy: true
  },
  'property': {
    pattern: /(((?<=(string|bool|int|int32|int64|float|float32|float64|map|list)\s+)\w+\b)|((?<=(:|<)\s*)\w+\b))/,
    greedy: true
  }
};
