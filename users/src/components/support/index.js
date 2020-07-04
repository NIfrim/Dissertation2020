import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Box, Container } from '@material-ui/core';
import { Spinner } from '../layout';
import { SectionHeader } from '../includes';
import { FAQ, SupportMessageDialog } from './includes';
import CustomRowCard from '../includes/CustomRowCard';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import BugReportDialog from './includes/BugReportDialog';

const useStyles = makeStyles((theme) => ({
  main: {
    backgroundColor: theme.palette.common.mainBackground,
    height: '100%'
  },

  headerRow: {
    backgroundColor: theme.palette.secondary.main
  }
}));

const Support = ({ app }) => {
  const classes = useStyles();
  const { loading } = app;

  const [dialogOpen, setDialogOpen] = useState({
    bugReport: false,
    support: false
  });

  return loading ? (
    <Spinner />
  ) : (
    <Box className={classes.main}>
      <Box
        className={classes.headerRow}
        display={'flex'}
        flexWrap={'nowrap'}
        flexDirection={'column'}
        alignItems={'stretch'}
        zIndex={-1}
      >
        <Container maxWidth={'lg'}>
          <SectionHeader
            title={'Support Section'}
            description={
              'Report bugs, contact support staff or find an answer in our FAQ section.'
            }
          />
        </Container>
      </Box>

      <Box>
        <Container maxWidth={'lg'}>
          <Box
            mt={1}
            mb={1}
            display={'flex'}
            flexDirection={'column'}
            alignItems={'stretch'}
          >
            <Button
              variant={'contained'}
              color={'secondary'}
              size={'large'}
              onClick={() =>
                setDialogOpen({ ...dialogOpen, support: !dialogOpen.support })
              }
            >
              Get in touch with us
            </Button>
            <SupportMessageDialog
              dialogOpen={dialogOpen.support}
              setDialogOpen={setDialogOpen}
            />
          </Box>

          <Box
            mt={1}
            mb={1}
            display={'flex'}
            flexDirection={'column'}
            alignItems={'stretch'}
          >
            <Button
              variant={'contained'}
              color={'secondary'}
              size={'large'}
              onClick={() =>
                setDialogOpen({
                  ...dialogOpen,
                  bugReport: !dialogOpen.bugReport
                })
              }
            >
              Submit a bug report
            </Button>
            <BugReportDialog
              dialogOpen={dialogOpen.bugReport}
              setDialogOpen={setDialogOpen}
            />
          </Box>

          <Box mt={1} mb={1}>
            <CustomRowCard
              icon={'account'}
              name={'personal'}
              title={'Questions & Answers'}
              description={
                'Find an answer to your question before trying to contact us.'
              }
            >
              <Box p={2}>
                <FAQ />
              </Box>
            </CustomRowCard>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

const mapStateToProps = ({ app }) => ({
  app
});

export default connect(mapStateToProps)(Support);
