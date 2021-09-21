import React, { Component } from 'react';
import './../../../src/Calc.css'

class Calculator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            r: '',
        };
    }

    calculate(r) {
        try{
        return eval(r);}
        catch(e){
            return "Invalid Operation";
        }
    }

    handleClick(evt) {
        let d = '';
        if (evt.target.value === 'C') {
            this.state.r = '';
            this.setState({ r: [this.state.r] });
        }

        else if(evt.target.value==='X'){
            let s=this.state.r[0];
            this.state.r=s.substring(0,s.length-1);
            this.setState({ r: [this.state.r] });
        }

        else if (evt.target.value === '=') {
            let s = this.state.r[0];
            let n1 = '';
            let n2 = '';
            if (s.includes('x^y')) {
                let i = s.indexOf('x');
                n1 = s.substring(0, i);
                n2 = s.substring(i + 3);
                this.state.r = Math.pow(n1, n2);
            }
            else
                this.state.r = this.calculate(s);
            this.setState({ r: [this.state.r] });
        }
        else {
            var roundNumber = function (number, decimals) {
                decimals = decimals || 5;
                return Math.round(number * Math.pow(10, decimals)) / Math.pow(10, decimals);
            }
            let t = this.state.r;
            if (evt.target.value === 'x^2') {
                this.state.r = '';
                this.state.r += Math.pow(t, 2);
            }

            else if (evt.target.value === 'x^1/2') {
                this.state.r = '';
                this.state.r += Math.sqrt(t);
            }

            else if (evt.target.value === '1/x') {
                this.state.r = '';
                this.state.r += 1 / t;
            }

            else if (evt.target.value === '10^x') {
                this.state.r = '';
                this.state.r += Math.pow(10, t);
            }

            else if (evt.target.value === 'ln') {
                this.state.r = '';
                this.state.r += Math.log(t);
            }

            else if (evt.target.value === 'log') {
                this.state.r = '';
                this.state.r += Math.log10(t);
            }

            else if (evt.target.value === 'pi') {
                this.state.r = '';
                this.state.r += Math.PI;
            }

            else if (evt.target.value === 'e') {
                this.state.r = '';
                this.state.r += Math.E;
            }

            else if (evt.target.value === 'n!') {
                this.state.r = '';
                let f = 1;
                for (let i = t; i > 0; i--)
                    f *= i;
                this.state.r += f;
            }

            else if (evt.target.value === 'sin') {
                this.state.r = '';
                this.state.r += roundNumber(Math.sin(t * Math.PI / 180));
            }

            else if (evt.target.value === 'cos') {
                this.state.r = '';
                this.state.r += roundNumber(Math.cos(t * Math.PI / 180));
            }

            else if (evt.target.value === 'tan') {
                this.state.r = '';
                this.state.r += roundNumber(Math.tan(t * Math.PI / 180));
            }

            else if (evt.target.value === 'sec') {
                this.state.r = '';
                this.state.r += roundNumber(1 / (Math.cos(t * Math.PI / 180)));
            }

            else if (evt.target.value === 'cosec') {
                this.state.r = '';
                this.state.r += roundNumber(1 / (Math.sin(t * Math.PI / 180)));
            }

            else if (evt.target.value === 'cot') {
                this.state.r = '';
                this.state.r += roundNumber(1 / (Math.tan(t * Math.PI / 180)));
            }

            else if (evt.target.value === 'sinh') {
                this.state.r = '';
                this.state.r += roundNumber(Math.sinh(t * Math.PI / 180));
            }

            else if (evt.target.value === 'cosh') {
                this.state.r = '';
                this.state.r += roundNumber(Math.cosh(t * Math.PI / 180));
            }

            else if (evt.target.value === 'tanh') {
                this.state.r = '';
                this.state.r += roundNumber(Math.tanh(t * Math.PI / 180));
            }

            else if (evt.target.value === 'sech') {
                this.state.r = '';
                this.state.r += roundNumber(1 / (Math.cosh(t * Math.PI / 180)));
            }

            else if (evt.target.value === 'cosech') {
                this.state.r = '';
                this.state.r += roundNumber(1 / (Math.sinh(t * Math.PI / 180)));
            }

            else if (evt.target.value === 'coth') {
                this.state.r = '';
                this.state.r += roundNumber(1 / (Math.tanh(t * Math.PI / 180)));
            }
            else
                this.state.r += evt.target.value;
            this.setState({ r: [this.state.r] });
        }
    }

    render() {
        return (
            <div>
                <h1>Calculator</h1>
                <table>
                    <tr>
                        <td colSpan="3"><input type="text" value={this.state.r} /></td>
                        <td><input type="button" value='X' onClick={this.handleClick.bind(this)} /></td>
                        <td><input type="button" value='C' onClick={this.handleClick.bind(this)} /></td>
                    </tr>
                    <tr>
                        <td><input type="button" value='1' onClick={this.handleClick.bind(this)} /></td>
                        <td><input type="button" value='2' onClick={this.handleClick.bind(this)} /></td>
                        <td><input type="button" value='3' onClick={this.handleClick.bind(this)} /></td>
                        <td ><input type="button" value='*' onClick={this.handleClick.bind(this)} /></td>
                        <td><input type="button" value='+' onClick={this.handleClick.bind(this)} /></td>
                    </tr>
                    <tr>
                        <td><input type="button" value='4' onClick={this.handleClick.bind(this)} /></td>
                        <td><input type="button" value='5' onClick={this.handleClick.bind(this)} /></td>
                        <td><input type="button" value='6' onClick={this.handleClick.bind(this)} /></td>
                        <td><input type="button" value='/' onClick={this.handleClick.bind(this)} /></td>
                        <td><input type="button" value='-' onClick={this.handleClick.bind(this)} /></td>
                    </tr>
                    <tr>
                        <td><input type="button" value='7' onClick={this.handleClick.bind(this)} /></td>
                        <td><input type="button" value='8' onClick={this.handleClick.bind(this)} /></td>
                        <td><input type="button" value='9' onClick={this.handleClick.bind(this)} /></td>
                        <td><input type="button" value='ln' onClick={this.handleClick.bind(this)} /></td>
                        <td><input type="button" value='log' onClick={this.handleClick.bind(this)} /></td>
                    </tr>
                    <tr>
                        <td><input type="button" value='0' onClick={this.handleClick.bind(this)} /></td>
                        <td><input type="button" value='.' onClick={this.handleClick.bind(this)} /></td>
                        <td><input type="button" value='n!' onClick={this.handleClick.bind(this)} /></td>
                        <td><input type="button" value='pi' onClick={this.handleClick.bind(this)} /></td>
                        <td><input type="button" value='e' onClick={this.handleClick.bind(this)} /></td>

                    </tr>

                    <tr>
                        <td><input type="button" value='x^2' onClick={this.handleClick.bind(this)} /></td>
                        <td><input type="button" value='1/x' onClick={this.handleClick.bind(this)} /></td>
                        <td><input type="button" value='x^1/2' onClick={this.handleClick.bind(this)} /></td>
                        <td><input type="button" value='10^x' onClick={this.handleClick.bind(this)} /></td>
                        <td><input type="button" value='x^y' onClick={this.handleClick.bind(this)} /></td>

                    </tr>
                    <tr>

                        <td><input type="button" value='sin' onClick={this.handleClick.bind(this)} /></td>
                        <td><input type="button" value='cos' onClick={this.handleClick.bind(this)} /></td>
                        <td><input type="button" value='tan' onClick={this.handleClick.bind(this)} /></td>
                        <td><input type="button" value='cosec' onClick={this.handleClick.bind(this)} /></td>
                        <td><input type="button" value='sec' onClick={this.handleClick.bind(this)} /></td>
                    </tr>
                    <tr>
                        <td><input type="button" value='cot' onClick={this.handleClick.bind(this)} /></td>
                        <td><input type="button" value='sinh' onClick={this.handleClick.bind(this)} /></td>
                        <td><input type="button" value='cosh' onClick={this.handleClick.bind(this)} /></td>
                        <td><input type="button" value='tanh' onClick={this.handleClick.bind(this)} /></td>
                        <td><input type="button" value='cosech' onClick={this.handleClick.bind(this)} /></td>
                    </tr>
                    <tr>
                        <td><input type="button" value='sech' onClick={this.handleClick.bind(this)} /></td>
                        <td><input type="button" value='coth' onClick={this.handleClick.bind(this)} /></td>
                        <td colSpan="3"><input type="button" value='=' onClick={this.handleClick.bind(this)} /></td>
                    </tr>
                    <tr>
                    </tr>
                </table>

            </div>
        );
    }
}

export default Calculator;
