var data;
var doc = document;

doc.querySelector('[name="contact-form"]').addEventListener('submit', function (event) {
  var errors = false;
  data = serialize(this);

//reset errors
  if (doc.querySelector('.error')) {
    doc.querySelector('.error').classList.remove('error');
  }
  if (doc.querySelector('.selectize-input.error')) {
    doc.querySelector('.selectize-input.error').classList.remove('error');
  }
  for (var i = 0; i < data.length; i++) {
    if (data[i]['name'] !== '') {
      if ((!data[i]['value'] && data[i]['required']) || (data[i]['name'] == 'interested-in' && !data[i]['value'])) {
//if there is no value, add error class and set errors flag
        errors = true;
        doc.querySelector('[name=' + data[i]['name'] + ']').classList.add('error');
//if the select has an error, we need to apply the error class to a different element
        if (data[i]['name'] == 'interested-in') {
          doc.querySelector('.selectize-input').classList.add('error');
        }
      }
    }
  }
  if (!errors) {
    var request = new XMLHttpRequest();
    request.open('POST', 'form-submit.php?format=json', true);
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    request.send(JSON.stringify(data));
    request.onreadystatechange = function () {
      if (request.readyState == 4 && request.status == 200) {
//hide form and show thank you message
        doc.querySelector('.js-std-form').classList.add('is-hidden');
        doc.querySelector('.js-std-form-success').classList.add('is-visible');
      }
    };
  }
  event.preventDefault();
  return false;
});
var serialize = (function (slice) {
  return function (form) {
//no form, no serialization
    if (form == null)
      return null;
//get the form elements and convert to an array
    return slice.call(form.elements)
      .filter(function (element) {
//remove disabled elements
        return !element.disabled;
      }).filter(function (element) {
//remove unchecked checkboxes and radio buttons
        return !/^input$/i.test(element.tagName) || !/^(?:checkbox|radio)$/i.test(element.type) || element.checked;
      }).filter(function (element) {
//remove <select multiple> elements with no values selected
        return !/^select$/i.test(element.tagName) || element.selectedOptions.length > 0;
      }).map(function (element) {
        switch (element.tagName.toLowerCase()) {
          case 'checkbox':
          case 'radio':
            return {
              name: element.name,
              value: element.value === null ? 'on' : element.value
            };
          case 'select':
            if (element.multiple) {
              return {
                name: element.name,
                value: slice.call(element.selectedOptions)
                  .map(function (option) {
                    return option.value;
                  })
              };
            }
            return {
              name: element.name,
              value: element.value,
              required: element.hasAttribute('required')
            };
          default:
            return {
              name: element.name,
              value: element.value || '',
              required: element.hasAttribute('required')
            };
        }
      });
  }
}(Array.prototype.slice));
