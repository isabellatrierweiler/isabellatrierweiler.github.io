TESTER = document.getElementById('tester');

function linspace(a,b,n) {
    let step= (b-a)/n;
    let array = [a];
    for (i=1; i<n; i++){
        array.push(a+(step*i))
    }
    return array;
}

function return_X (a, e, i, Omega, omega, theta){
    r = a*(1.0 - Math.pow(e,2)) / (1.0 + e*Math.cos(theta));
    return r*(Math.cos(Omega)*Math.cos(omega + theta) - Math.sin(Omega)*Math.sin(omega+theta)*Math.cos(i))
}

function return_Y(a, e, i, Omega, omega, theta){
    r = a*(1.0 - Math.pow(e,2)) / (1.0 + e*Math.cos(theta));
    return r*(Math.sin(Omega)*Math.cos(omega + theta) + Math.cos(Omega)*Math.sin(omega+theta)*Math.cos(i))
}

function return_Z(a, e, i, Omega, omega, theta){
    r = a*(1.0 - Math.pow(e,2)) / (1.0 + e*Math.cos(theta));
    return r*Math.sin(omega+theta)*Math.sin(i)
}
function orbit_to_coord_point(a, e, inc, Omega, omega, ftrue){
    let X= return_X(a, e, inc, Omega, omega, ftrue);
    let Y= return_Y(a, e, inc, Omega, omega, ftrue);
    let Z= return_Z(a, e, inc, Omega, omega, ftrue);
    // return [X, Y, Z];
    return {
        X: X,
        Y: Y,
        Z: Z
    };
}

function orbit_to_coord(a, e, inc, Omega, omega, flag){
    //  a	e	i	Omega	omega	l	P	f
    theta_list = linspace(0,2*Math.PI,300);
    if (flag=='h'){ //open orbits
        theta_list= linspace(-Math.PI/1.1, Math.PI/1.1, 300);
    }
    let X= [];
    let Y= [];
    let Z= [];
    for (let i=0; i< 300; i++){
        theta= theta_list[i]
        X.push(return_X(a, e, inc, Omega, omega, theta));
        Y.push(return_Y(a, e, inc, Omega, omega, theta));
        Z.push(return_Z(a, e, inc, Omega, omega, theta))
    };

    // return [X, Y, Z];
    return {
        X: X,
        Y: Y,
        Z: Z
    };
}

function plot_orbits(){
    var a_val, e_val, i_val;
    a_val= document.getElementById("a_in").value;
    e_val= document.getElementById("e_in").value;
    i_val= document.getElementById("i_in").value*(Math.PI/180.0);
    Omega_val= document.getElementById("Omega_in").value*(Math.PI/180.0);
    omega_val= document.getElementById("omega_in").value*(Math.PI/180.0);
    f_val= document.getElementById("f_in").value*(Math.PI/180.0);

    var flag='none';
    if (Math.abs(e_val)>1){
        flag='h'
    }

    var points = {
        x: [orbit_to_coord_point(a_val, e_val, i_val, Omega_val, omega_val, f_val).X,0],
        y: [orbit_to_coord_point(a_val, e_val, i_val, Omega_val, omega_val, f_val).Y,0],
        z: [orbit_to_coord_point(a_val, e_val, i_val, Omega_val, omega_val, f_val).Z,0],
        mode: 'markers',
        type: 'scatter3d',
        name: 'Star and Planet'
    };

    var orbit = {
        x: orbit_to_coord(a_val, e_val, i_val, Omega_val, omega_val, flag).X,
        y: orbit_to_coord(a_val, e_val, i_val, Omega_val, omega_val, flag).Y,
        z: orbit_to_coord(a_val, e_val, i_val, Omega_val, omega_val, flag).Z,
        mode: 'lines',
        type: 'scatter3d',
        name: 'Orbit'
    };

    var data=[points, orbit];
    // var layout = {
    //     xaxis: {
    //       title: {
    //         text: 'x AU',
    //       },
    //     },
    //     yaxis: {
    //       title: {
    //         text: 'y AU',
    //       },
    //     },
    //     zaxis: {
    //         title: {
    //           text: 'z AU',
    //         },
    //     }
    // }
    Plotly.newPlot( TESTER, data);
}