export const mapIcon = {
    user: 'user',
    'account-cms': 'account-cms',
    layout: 'layout',
    profile: 'layout',
    'special-offers': 'special-offers',
    'loan-policy': 'loan-policy',
    'user-manual': 'user-manual',
    'payment-guide': 'payment-guide',
    'expertise-1': 'expertise-1',
    'expertise-2': 'expertise-2',
    'configuration': 'configuration',
    'loan-terms': 'loan-terms',
    permission: 'permission',
    step: 'step',
    'loan-amount': 'loan-amount',
    onboarding: 'onboarding',
    partner: 'partner',
    'company-information': 'partner',
    'loan-banner': 'loan-banner',
    'customer-care': 'customer-care',
    'disbursement': 'disbursement',
    'payment': 'payment',
};

export const getImg = (nameRoute, active) => {
    return mapIcon[nameRoute] + (active ? '-active.svg' : '.svg');
}