const Handlebars = require('handlebars');

module.exports = (field, sort) => {
    // const sortType = field === sort.column ? sort.type : 'default';

    const icons = {
      default: 'chevron-expand-outline',
      desc: 'arrow-down-outline',
      asc: 'arrow-up-outline',
    };
    const types = {
      default: 'desc', // lần bấm thứ nhất
      desc: 'asc', // lần bấm thứ ba
      asc: 'desc', // lần bấm thứ hai
    };
    const icon = icons[sort.type];
    const type = types[sort.type];
    const href = Handlebars.escapeExpression(`?_sort&column=${field}&type=${type}`)

    const output = `
    <a class="chevron-expand-outline" href="${href}">
        <ion-icon name=${icon}></ion-icon>
    </a>
    `
    return new Handlebars.SafeString(output);
};