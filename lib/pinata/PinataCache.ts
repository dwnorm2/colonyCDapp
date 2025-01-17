import { PINATA_GATEWAY, PINATA_CACHE_STORE } from './constants';

class PinataCache {
  private cache?: Cache = undefined;

  constructor() {
    this.init();
  }

  async init(): Promise<Cache | undefined> {
    if (!this.cache && 'caches' in window) {
      this.cache = await caches.open(PINATA_CACHE_STORE);
    }

    return this.cache;
  }

  async getCacheObject(hash: string): Promise<Response | null> {
    /*
     * Make sure the cache is initialized
     */
    await this.init();

    const HASH_URL = `${PINATA_GATEWAY}/${hash}`;
    try {
      /*
       * @NOTE That this.cache exists at this point in time, just that TS doesn't
       * realize this as it can't properly deal with async constructor assignments
       */
      let response = await this.cache?.match(new Request(HASH_URL));
      /*
       * @NOTE If we don't find the object in the local cache, attempt to get it
       * from the Gateway
       */
      if (!response) {
        response = (await this.setCacheObject(hash)) as Response;
        console.error(`Could not fetch Pinata Cache entry for hash '${hash}'`);
        /*
         * @NOTE Only if we can't find it via the Gateway that we'll throw
         */
        if (!response) {
          throw new Error(
            `Could not fetch Pinata IPFS entry (both Cache or Gateway for hash ${hash}`,
          );
        }
      }
      return response;
    } catch (error) {
      console.error('Could not get IPFS hash from Pinata Cache:', HASH_URL);
      console.error(error);
      return null;
    }
  }

  async setCacheObject(
    hash: string,
    networkResponse?: Response,
  ): Promise<Response | null> {
    /*
     * Make sure the cache is initialized
     */
    await this.init();

    const HASH_URL = `${PINATA_GATEWAY}/${hash}`;
    try {
      if (!networkResponse) {
        /*
         * @NOTE That this.cache exists at this point in time, just that TS doesn't
         * realize this as it can't properly deal with async constructor assignments
         */
        /*
         * @NOTE If we don't have a network response already, it means that we didn't
         * upload the IPFS blob ourself, in which case, we'll have to request it from
         * the Gateway
         */
        if (!this.cache) {
          throw new Error('Cache has not been initialized successfully');
        }

        await this.cache.add(new Request(HASH_URL));
      } else {
        /*
         * @NOTE If we have a network response, that means that we've uploaded to IPFS
         * ourselfs, so there's no point in fetching it again from the Gateway as we
         * already have this data locally
         */
        await this.cache?.put(HASH_URL, networkResponse);
      }
      return this.getCacheObject(hash);
    } catch (error) {
      console.error('Could not set the Pinata Cache entry for hash', HASH_URL);
      console.error(error);
      return null;
    }
  }
}

export default PinataCache;
