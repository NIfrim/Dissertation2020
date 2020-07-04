import { ApolloLink } from 'apollo-boost'

const descendingComparator = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

/** Function used to return permissions for the specified account type
 * 
 * @param {string} accountType 
 */
export const getScopes = (accountType) => {
  switch (accountType) {
    case 'COMPANY_SUPER':
      return ['MANAGE_ACCESS_GROUPS', 'MANAGE_STORES'];

    case 'STORE_SUPER':
      return ['MANAGE_STORE_ACCESS_GROUPS', 'MANAGE_PRODUCTS', 'MANAGE_PROMOTIONS'];

    case 'SECRETARY':
      return ['VIEW_STORES', 'VIEW_PRODUCTS', 'VIEW_PROMOTIONS'];

    default: return [];
  }
}

export const getFormattedAddress = (data) => { 

  const {results, status} = data;

  const address = {
    number: '',
    street: '',
    city: '',
    postcode: '',
    country: ''
  }

  if (status === 'OK') {
    const addressComponents = {};
    results[0].address_components.forEach(elem => {
      addressComponents[elem.types[0]] = elem.long_name
    })

    address.number = addressComponents.street_number;
    address.street = addressComponents.route;
    address.city = addressComponents.postal_town;
    address.country = addressComponents.country;
    address.postcode = addressComponents.postal_code;
  }

  return address;
}

export const tableSort = (array, comparator) => {
  const stabilizedThis = array.map((el, index) => [el, index])
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) return order
    return a[1] - b[1]
  })
  return stabilizedThis.map(el => el[0])
}

export const getComparator = (order, orderBy) => {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

export const setAuthHeader = token => {
  if (token) {
    const authLink = new ApolloLink((op, fwd) => {
      op.setContext({
        headers: {
          authorization: token
        }
      })

      return fwd(op)
    })

    return authLink
  } else {
    return null
  }
}

export const normalizeForStore = obj => {
  const pattern = /,?"__[A-z]+":"[A-z]+",?/g
  const withoutTypename = JSON.stringify(obj).replace(pattern, '')

  const newData = JSON.parse(withoutTypename)

  return newData
}

export const normalizeForGet = string => {
  const pattern = /\s/g
  const normalized = string.trim().replace(pattern, '+')
  return normalized
}


/** Method returns the linked products in all passed promotion groups
 * 
 * @param {object} promoGroups 
 * @returns Array
 */
export const getPromoTypeProducts = (promoGroups) => {
  let products = [];

  if (promoGroups !== undefined) {

    for (let promoGroupId in promoGroups) {

      // Loop through each linked product group to get the products
      for (let prodGroupId in promoGroups[promoGroupId].linkedProductGroups) {

        // Push the products to the products array
        // promoGroups[promoGroupId].linkedProductGroups[prodGroupId].products.forEach(prod => products.push(prod))
        if (promoGroups[promoGroupId].linkedProductGroups[prodGroupId].products) {
          products = [...products, ...promoGroups[promoGroupId].linkedProductGroups[prodGroupId].products];
        }
      }
    }
    
  }

  return products;
}

/** Method returns the linked products in all passed promotion groups
 * 
 * @param {object} productGroups 
 * @returns Array
 */
export const getPromoGroupProducts = (productGroups) => {
  let linkedProducts = [];

  for (let productGroupId in productGroups) {
    linkedProducts = [...linkedProducts, ...productGroups[productGroupId].products]
  }

  return linkedProducts
}

/** Method used to structure the data from promo groups
 * 
 * @param {object} promoGroups 
 */
export const getPromoGroupsWithProducts = (promoGroups) => {

  let promoTypeObj = {};

  for (let key in promoGroups) {
    promoTypeObj[key] = {};

    // Loop through each promo groups
    promoGroups[key].forEach(promoGroupElem => {

      const {linkedProductGroups, ...rest} = promoGroupElem;

      promoTypeObj[key][promoGroupElem._id] = rest;
      promoTypeObj[key][promoGroupElem._id].linkedProductGroups = {};

      // Set the linked products for each promotion group
      promoGroupElem.linkedProductGroups.forEach(productGroupElem => {

        promoTypeObj[key][promoGroupElem._id].linkedProductGroups[productGroupElem._id] = {...productGroupElem};        
      });
      
    })
  }

  return promoTypeObj;
}
