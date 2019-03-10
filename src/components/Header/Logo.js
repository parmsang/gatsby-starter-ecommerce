import React from 'react'
import {Image} from 'semantic-ui-react'

import moltin from '../../images/moltin-light-hex.svg.svg'

const Logo = () => (
  <Image
    size="mini"
    src={moltin}
    style={{marginRight: '1.5em'}}
    alt="I love Lamp"
  />
)

export default Logo
