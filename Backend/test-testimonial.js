const { Testimonial } = require('./models');

console.log('Testimonial model:', Testimonial);
console.log('Testimonial methods:', Object.getOwnPropertyNames(Testimonial));
console.log('Testimonial prototype:', Object.getOwnPropertyNames(Testimonial.prototype));

// Tester une requête simple
Testimonial.findAll()
  .then(testimonials => {
    console.log('Found testimonials:', testimonials.length);
  })
  .catch(error => {
    console.error('Error:', error.message);
  });
