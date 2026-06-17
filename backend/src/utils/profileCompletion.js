const calculateProfile =
  (user) => {
    const fields = [
      user.fullName,
      user.email,
      user.mobileNumber,
      user.alternateMobileNumber,
      user.address,
      user.city,
      user.state,
      user.pincode,
      user.country
    ];

    const filled =
      fields.filter(Boolean)
        .length;

    const percentage =
      Math.round(
        (filled /
          fields.length) *
          100
      );

    return {
      percentage,
      completed:
        percentage === 100
    };
  };

module.exports =
  calculateProfile;