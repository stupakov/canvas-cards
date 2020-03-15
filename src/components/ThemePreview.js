import React from 'react'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles({
  themePreview: {
    display: 'flex',
    marginTop: '20px',
    alignItems: 'center',
    '& > .theme-label': {
      marginRight: '10px',
      marginLeft: '10px'
    },
    '& > .theme': {
      display: 'flex',
      '& > .color': {
        marginRight: '10px',
        border: '4px solid white',
        borderRadius: '4px',
        width: '50px',
        height: '50px',
        overflow: 'hidden'
      }
    }
  }
})

export default ({ colors, name }) => {
  const classes = useStyles()

  const id = `theme-preview-${name}`

  return (
    <div className={classes.themePreview}>
      <div className='theme-label'>{name}</div>
      <div className='theme'>
        {colors.map(color => (
          <div
            className='color'
            style={{
              background: color.string()
            }}
          />
        ))}
      </div>
    </div>
  )
}
