const {
  graphqlRequest,
  getVoterRewardRange,
  getVoterReward,
} = require('./utils');
const { getUserReputation } = require('./graphql');

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
  const { voterAddress, colonyAddress, motionDomainId, motionId, rootHash } =
    event?.arguments?.input || {};

  const { data } = await graphqlRequest(getUserReputation, {
    input: {
      colonyAddress,
      walletAddress: voterAddress,
      domainId: Number(motionDomainId),
      rootHash,
    },
  });

  const userReputation = data?.getUserReputation;
  const range = await getVoterRewardRange(
    colonyAddress,
    motionId,
    userReputation,
    voterAddress,
  );

  const reward = await getVoterReward(colonyAddress, motionId, userReputation);

  if (!range) {
    return undefined;
  }

  const [min, max] = range;
  return {
    min: min.toString(),
    max: max.toString(),
    reward: reward?.toString() || '0',
  };
};