import Vue from 'vue'
import I18n from 'vue-i18n'
import En from './en'
import Zh from './zh'

Vue.use(I18n)

const MyI18n = new I18n({
    locale : 'zh',
    messages : {
       en : {
           ...En
       },
       zh : {
           ...Zh
       }
    }

});

export default MyI18n;