// Load the enviroment variables
require('dotenv').config();

const redis = require('redis');
const redisClient = redis.createClient(); // Docker container config { host: "172.18.0.3", port: 6379 }

redisClient.on('error', err => {
  console.log('Redis Error : ' + err);
});

/**
 * Gets the data from the cache
 *
 * @param {*} redisKey - key name to search the cache
 */
async function getDataFromCache(redisKey) {
  return new Promise((resolve, reject) => {
    redisClient.get(redisKey, (err, result) => {
      if (result) {
        resolve(JSON.parse(result));
      } else {
        resolve(false);
      }
    });
  });
}

/**
 * Save the data to the cache
 *
 * @param {*} redisKey - key name of the data getting saved
 * @param {*} expireInSec - Time for data to stay inside the cache
 * @param {*} value - the data
 */
function saveDataToCache(redisKey, expireInSec, value) {
  redisClient.setex(redisKey, expireInSec, JSON.stringify(value));
}

module.exports = {
  getDataFromCache,
  saveDataToCache
};
