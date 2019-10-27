import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import { Typography, Button } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import { withRouter } from 'react-router-dom'

const AlertDialogue = (props) => {

  const { onClose, show } = props

  const handleClose = (buttonInfo) => {
    return () => {
      onClose(buttonInfo)
    }

  }

  const showHideClassName = show ? "modal display-block" : "modal display-none";
  return (
    <Grid
      container
    >
      <div className={showHideClassName}>
        <section className="modal-main">
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
          >
            <Grid item xs={12} >
              <Typography variant="subtitle1" style={{ margin: "50px 0px" }} align='center'>
                Done Succesful transaction!!!
                </Typography>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="outlined"
                color="secondary"
                style={{ margin: "20px 10px 30px 10px", padding: "5px 25px" }}
                onClick={handleClose({ button: "notification" })}
              >
                Close
              </Button>
            </Grid>
          </Grid>

        </section>
      </div>
    </Grid>

  )

}

export default withRouter(AlertDialogue)