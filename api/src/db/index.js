import neo4j from 'neo4j-driver'

const driver = neo4j.driver(
  'bolt://51.141.95.124:7687',
  neo4j.auth.basic('admin', 'Dissertation2020!')
)

const neo4jQuery = async query => {
  let session = driver.session()
  try {
    let result = await session.run(query).catch(error => {
      throw 'Database error encountered: ' + error
    })

    // Form the object to be returned
    // Needed because the id is stored under a different key
    return result.records[0] && result.records[0].length > 0
      ? result.records[0]._fields[0]
      : null
  } catch (e) {
    await session.close()
    console.error('Error in db/index.js: ' + e)
  }
}

export { driver as default, neo4jQuery }
