use std::env;
use std::fs;
use std::iter::Map;

fn main() {
    let args: Vec<String> = env::args().collect();

    let filename = &args[1];

    println!("In file {}", filename);

    let contents = fs::read_to_string(filename)
        .expect("Something went wrong reading the file");

    let directions = contents.lines();
    
    let mut direction_tuples = directions.map(| direction | {
        let mut direction_iter = direction.split(' ');
        (direction_iter.next().unwrap(), direction_iter.next().unwrap())
    });
    println!("direction_tuples {:?}", direction_tuples.next());
}

fn day_one() {
    let args: Vec<String> = env::args().collect();

    let filename = &args[1];

    println!("In file {}", filename);

    let contents = fs::read_to_string(filename)
        .expect("Something went wrong reading the file");

    let readings = contents.lines();
    
    let digits = readings.map(|depth| depth.parse::<i32>().unwrap());
    let digit_vector: Vec<i32> = digits.clone().collect();
    
    let initial = &mut[0, 0];
    let single_increases = digits.clone().fold(initial, |acc, x| {
            if acc[0] > 0 && x > acc[0] {
                acc[1] += 1;
            }
            acc[0] = x;
            acc
        });

    let windows: Vec<i32> = digits.enumerate().map(| (i, x) | {
        let add1 = digit_vector.get(i + 1).unwrap_or(&0);
        let add2 = digit_vector.get(i + 2).unwrap_or(&0);
        x + add1 + add2
    }).collect();

    let window_initial = &mut[0, 0];
    let window_increases = windows.into_iter().fold(window_initial, |acc, x| {
        if acc[0] > 0 && x > acc[0] {
            acc[1] += 1;
        }
        acc[0] = x;
        acc
    });
    println!("Initial sum:\n{:?}", single_increases[1]);
    println!("Windows sum:\n{:?}", window_increases[1]);
}