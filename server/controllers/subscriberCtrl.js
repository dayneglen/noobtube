module.exports = {
  toggleSubscription: async (req, res) => {
    const { subscriberId, creatorId } = req.body,
      db = req.app.get("db");

    const checkSubscription = await db.subscription.check_subscription([
      subscriberId,
      creatorId,
    ]);
    if (!checkSubscription[0]) {
        const addSubscription = await db.subscription
          .create_subscription([subscriberId, creatorId])
        return res.sendStatus(200);
    }
  
    try {
      const deletedUser = await db.subscription.delete_subscription([
        subscriberId,
        creatorId,
      ]);
      return res.sendStatus(200);
    }
    catch (err) {
        throw err
    }
  },
  getSubscribers: (req, res) => {
    
  }
};
