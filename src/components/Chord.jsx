import React, { Component } from 'react';
import { element } from 'prop-types';

export default class Chord extends Component {

  buildChord = (chord) => {
    const frets = {
      1: 20,
      2: 60,
      3: 100,
      4: 140
    }

    return [1,2,3,4,5,6].map(string => {
      switch(string) {
        case 1:
          if(chord.one.muted || chord.one.open || !chord.one.fret)
            if(chord.one.muted)
              return (
                <g key={string}>
                  <line x1="5" y1="-20" x2="15" y2="-10" strokeWidth="2" stroke="#a1a1a3" />
                  <line x1="15" y1="-20" x2="5" y2="-10" strokeWidth="2" stroke="#a1a1a3" />
                </g>
              )
            else if (chord.one.open)
              return <circle key={string} cx="10" cy="-15" r="5" fill="transparent" stroke="#a1a1a3" strokeWidth="3" />
            else
              return null
          else
            return <circle key={string} cx="10" cy={ frets[chord.one.fret] } r="10" fill="#1EEAA9" />
          break;
        case 2:
          if(chord.two.muted || chord.two.open || !chord.two.fret)
            if(chord.two.muted)
              return (
                <g>
                  <line x1="35" y1="-20" x2="45" y2="-10" strokeWidth="2" stroke="#a1a1a3" />
                  <line x1="45" y1="-20" x2="35" y2="-10" strokeWidth="2" stroke="#a1a1a3" />
                </g>
              )
            else if (chord.two.open)
              return <circle key={string} cx="40" cy="-15" r="5" fill="transparent" stroke="#a1a1a3" strokeWidth="3" />
            else
              return null
          else
            return <circle key={string} cx="40" cy={ frets[chord.two.fret] } r="10" fill="#1EEAA9" />
          break;
        case 3:
          if(chord.three.muted || chord.three.open || !chord.three.fret)
            if(chord.three.muted)
              return (
                <g>
                  <line x1="65" y1="-20" x2="75" y2="-10" strokeWidth="2" stroke="#a1a1a3" />
                  <line x1="75" y1="-20" x2="65" y2="-10" strokeWidth="2" stroke="#a1a1a3" />
                </g>
              )
            else if (chord.three.open)
              return <circle key={string} cx="70" cy="-15" r="5" fill="transparent" stroke="#a1a1a3" strokeWidth="3" />
            else
              return null
          else
            return <circle key={string} cx="70" cy={ frets[chord.three.fret] } r="10" fill="#1EEAA9" />
          break;        
        case 4:
          if(chord.four.muted || chord.four.open || !chord.four.fret)
            if(chord.four.muted)
              return (
                <g>
                  <line x1="95" y1="-20" x2="105" y2="-10" strokeWidth="2" stroke="#a1a1a3" />
                  <line x1="105" y1="-20" x2="95" y2="-10" strokeWidth="2" stroke="#a1a1a3" />
                </g>
              )
            else if (chord.four.open)
              return <circle key={string} cx="100" cy="-15" r="5" fill="transparent" stroke="#a1a1a3" strokeWidth="3" />
            else
              return null
          else
            return <circle key={string} cx="100" cy={ frets[chord.four.fret] } r="10" fill="#1EEAA9" />
          break;        
        case 5:
          if(chord.five.muted || chord.five.open || !chord.five.fret)
            if(chord.five.muted)
              return (
                <g>
                  <line x1="125" y1="-20" x2="135" y2="-10" strokeWidth="2" stroke="#a1a1a3" />
                  <line x1="135" y1="-20" x2="125" y2="-10" strokeWidth="2" stroke="#a1a1a3" />
                </g>
              )
            else if (chord.five.open)
              return <circle key={string} cx="130" cy="-15" r="5" fill="transparent" stroke="#a1a1a3" strokeWidth="3" />
            else
              return null
          else
            return <circle key={string} cx="130" cy={ frets[chord.five.fret] } r="10" fill="#1EEAA9" />
          break;
        case 6:
          if(chord.six.muted || chord.six.open || !chord.six.fret)
            if(chord.six.muted)
              return (
                <g>
                  <line x1="155" y1="-20" x2="165" y2="-10" strokeWidth="2" stroke="#a1a1a3" />
                  <line x1="165" y1="-20" x2="155" y2="-10" strokeWidth="2" stroke="#a1a1a3" />
                </g>
              )
            else if (chord.six.open)
              return <circle key={string} cx="160" cy="-15" r="5" fill="transparent" stroke="#a1a1a3" strokeWidth="3" />
            else
              return null
          else
            return <circle key={string} cx="160" cy={ frets[chord.six.fret] } r="10" fill="#1EEAA9" />
          break;
        default:
          return null;
      }
    })
  }

  buildBarre = (chord) => {
    const frets = {
      1: 20,
      2: 60,
      3: 100,
      4: 140
    }

    const strings = {
      1: 10,
      2: 40,
      3: 70,
      4: 100,
      5: 130,
      6: 160
    }

    return [0,1,2].map(index => {
      if (index < 2)
        return <circle key={index} cx={ strings[chord.barreStrings[index]]} cy={ frets[chord.barreFret] } r="10" fill="#1EEAA9" />
      else 
        return <rect key={index} x={strings[chord.barreStrings[0]]} y={ frets[chord.barreFret] - 10 } width={ (chord.barreStrings[1] - chord.barreStrings[0]) * 30 } height="20" fill="#1EEAA9" />
    });
  } 
  
  fretLabel = (chord) => {
    if (chord.firstFret != 1)
      return <div>{chord.firstFret}</div>
    else
      return null
  }

  render() {
    let D = {
      name: 'D Major',
      firstFret: 1,
      lastFret: 4,
      barre: false,
      barreFret: null,
      barreStrings: null,
      one: {
        muted: true,
        open: false,
        fret: null
      },
      two: {
        muted: true,
        open: false,
        fret: null
      },
      three: {
        muted: false,
        open: true,
        fret: null
      },
      four: {
        muted: false,
        open: false,
        fret: 2
      },
      five: {
        muted: false,
        open: false,
        fret: 3
      },
      six: {
        muted: false,
        open: false,
        fret: 2
      }
    }

    let chord = D;

    return (
      <div className="chord">
        <h3 style={{ textAlign: 'center' }}>{chord.name}</h3>
        <div>{this.fretLabel(chord)}</div>
        <svg width="170" height="160" style={ { padding: '10px', overflow: 'visible' } }>

          {/* Top and Bottom */}
          <line x1="10" y1="0" x2="160" y2="0" strokeWidth="6" stroke="#616163" />
          <line x1="10" y1="160" x2="160" y2="160" strokeWidth="4" stroke="#616163" />

          {/* 1 and 6 */}
          <line x1="10" y1="0" x2="10" y2="160" strokeWidth="2" stroke="#a1a1a3" />
          <line x1="160" y1="0" x2="160" y2="160" strokeWidth="2" stroke="#a1a1a3" />

          {/* Frets */}
          <line x1="10" y1="40" x2="160" y2="40" strokeWidth="2" stroke="#616163" />
          <line x1="10" y1="80" x2="160" y2="80" strokeWidth="2" stroke="#616163" />
          <line x1="10" y1="120" x2="160" y2="120" strokeWidth="2" stroke="#616163" />
          
          {/* Strings */}
          <line x1="40" y1="0" x2="40" y2="160" strokeWidth="2" stroke="#a1a1a3" />
          <line x1="70" y1="0" x2="70" y2="160" strokeWidth="2" stroke="#a1a1a3" />
          <line x1="100" y1="0" x2="100" y2="160" strokeWidth="2" stroke="#a1a1a3" />
          <line x1="130" y1="0" x2="130" y2="160" strokeWidth="2" stroke="#a1a1a3" />

          {this.buildChord(chord)}
          { chord.barre ? this.buildBarre(chord) : '' }
        </svg>
      </div>
    )
  }
}