"use strict";

const VALID_SEVERITIES = /^(error|warn|info)$/;
const DEFAULT_SEVERITY = 'warn';
const DEFAULT_RULE     = 'unnamed';

function normalizeSeverity (pSeverity){
    const lSeverity = pSeverity ? pSeverity : DEFAULT_SEVERITY;

    return Boolean(lSeverity.match(VALID_SEVERITIES)) ? lSeverity : DEFAULT_SEVERITY;
}

function normalizeName(pRule) {
    return pRule ? pRule : DEFAULT_RULE;
}

function normalizeRule(pRule) {
    return Object.assign(
        pRule,
        {
            severity : normalizeSeverity(pRule.severity),
            name     : normalizeName(pRule.name)
        }
    );
}

/**
 * 'Normalizes' the given rule set pRuleSet by adding default values for
 * attributes that are optional and not present in the rule set; in casu:
 * - rule name (default 'unnamed')
 * - severity (default 'warn')
 *
 * @param  {object} pRuleSet [description]
 * @return {object}          [description]
 */
module.exports = (pRuleSet) => {
    if (pRuleSet.hasOwnProperty("allowed")){
        pRuleSet.allowed = pRuleSet.allowed.map(normalizeRule);
    }

    if (pRuleSet.hasOwnProperty("forbidden")){
        pRuleSet.forbidden = pRuleSet.forbidden.map(normalizeRule);
    }

    return pRuleSet;
};
