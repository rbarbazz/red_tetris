import React from 'react'
import chai, {expect} from 'chai'
import { h } from 'preact';
import assertJsx from 'preact-jsx-chai';
import ShallowRenderer from 'react-test-renderer/shallow';
import {Tetris, Board} from '../src/client/components/test'

chai.should()
chai.use(assertJsx);

describe('Fake react test', function(){
  it('works', function(){
    const renderer = new ShallowRenderer()
    renderer.render(React.createElement(Tetris))
    const output = renderer.getRenderOutput()
    expect(output).to.deep.equal(<Board/>)
  })

})
