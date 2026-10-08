import type { UserConfig } from '@commitlint/types';

import { RuleConfigSeverity } from '@commitlint/types';

const config: UserConfig = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'header-case': [RuleConfigSeverity.Error, 'always', 'lower-case'],
    'header-max-length': [RuleConfigSeverity.Error, 'always', 72],
  },
};

export default config;
