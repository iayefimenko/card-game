const Model = require("../model.js");

class UserCards extends Model {
  constructor() {
    super("user_cards");
  }

  async getUserCards(userId) {
    return await super.execute(
      `SELECT cards.* FROM user_cards
       LEFT JOIN cards ON user_cards.card_id = cards.id
       WHERE user_cards.user_id = ${userId}`
    );
  }

  async getRandomUserCard(userId) {
    return await super.execute(
      `SELECT cards.*
       FROM user_cards 
       LEFT JOIN cards ON user_cards.card_id = cards.id
       WHERE user_cards.user_id = ${userId}
       ORDER BY RAND()
       LIMIT 1`
    );
  }

  async getNotOwnedCards(userId) {
    return await super.execute(
      `SELECT * FROM cards LEFT JOIN user_cards ON cards.id = user_cards.user_id AND user_cards.user_id = ${userId}
      WHERE user_cards.user_id IS NULL`
    );
  }
}

module.exports = UserCards;
