import layoutDefault from '@/components/layouts/default-layout';
import notBaseLayout from '@/components/layouts/not-base-layout';
import invalid from '@/components/form/invalid';
import noData from '@/components/no-data';
import inputPassword from '@/components/form/inputPassword';
import kyc from '@/components/form/kyc';
import noteFail from '@/components/form/noteFail';
import buttomFixed from '@/components/form/buttomFixed';


Vue.component('default-layout', layoutDefault);
Vue.component('not-base-layout', notBaseLayout);
Vue.component('form-invalid', invalid);
Vue.component('no-data', noData);
Vue.component('input-password', inputPassword);
Vue.component('kyc', kyc);
Vue.component('note-fail', noteFail);
Vue.component('buttom-fixed', buttomFixed);

