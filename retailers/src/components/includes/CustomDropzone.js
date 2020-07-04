import React from 'react'
import { DropzoneArea } from 'material-ui-dropzone'
import { makeStyles } from '@material-ui/styles'
import { Box } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    margin: 0,
    padding: 0
  }
}))

const CustomDropZone = props => {
  const classes = useStyles()

  return (
    <Box overflow={'hidden'}>
      <DropzoneArea
        dropzoneClass={classes.root}
        previewChipProps={{ classes: { root: classes.root } }}
        filesLimit={1}
        acceptedFiles={[
          'application/vnd.ms-excel',
          'text/plain',
          'text/richtext',
          'text/comma-separated-values'
        ]}
        maxFileSize={100000}
        dropzoneText={'Add products from a file (.csv, .txt, .xls)'}
        showPreviews={false}
        {...props}
      />
    </Box>
  )
}

CustomDropZone.propTypes = {
  ...DropzoneArea.propTypes
}

export default CustomDropZone
