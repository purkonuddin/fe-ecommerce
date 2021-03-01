export const filterApply = (data) => {
    return {
      type: 'FILTER_APPLY',
      payload: data
    };
  };

export const filterDiscard = () => {
return {
    type: 'FILTER_DISCARD', 
};
};