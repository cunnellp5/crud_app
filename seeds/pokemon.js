
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('pokemon').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('pokemon').insert({
          name: 'charmander',
          type: 'fire',
          size: 'sm'
        }),
        knex('pokemon').insert({
          name: 'squirtle',
          type: 'water',
          size: 'sm'
        }),
        knex('pokemon').insert({
          name: 'mewtwo',
          type: 'rare',
          size: 'm'
        })
      ]);
    });
};
