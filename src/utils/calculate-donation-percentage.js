export function calculateDonationPercentage(
  donationReceived,
  donationRequired
) {
  if (donationRequired == 0) {
    return 0;
  }
  return Math.min(donationReceived / donationRequired, 1);
}
