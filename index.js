const tableX = 5 // Width of Table
const tableY = 5 // Height of Table
const cDir = ["NORTH", "EAST", "SOUTH", "WEST"] // Cardinal directions
let roboDirection = 0 // Sets the default based off the above array
let cmdSplit = [] //sets up the array to save commands

// Sets default setting for robot's coordinates X, Y
let robotX = 0
let robotY = 0
let isRobotPlaced = false // Determines if the robot has been placed on the board...
const commandTokens = [] // Sets up a basic array to hold our tokens

/**
 * Invalid Command
 * @param {*} item
 */

const invalidCommandToken = (item) => {
    // eslint-disable-next-line no-undef
    console.log(" Wrong Command: '" + item.join(" "))
}

/**
 * Checks if value is below zero
 * @param {*} val
 * @returns
 */

const isLessThanZero = (val) => val < 0

/**
 * Checks if value is equal to or above a certain limit
 * @param {*} val
 * @param {*} limit
 * @returns
 */

const isOutOfTableLimit = (val, limit) => val >= limit

/**
 * Checks if string represents a positive value
 * @param {*} str
 * @returns
 */

const isPositiveInt = function (str) {
    var n = Math.floor(Number(str))
    return n !== Infinity && String(n) === str && n >= 0
}

/**
 * Checks to see if the string is a direction in the direction array
 * @param {*} str
 * @returns
 */

let isValidDir = (str) => !!~ cDir.indexOf(str)

/**
 * Returns the index of the direction string
 * @param {*} str
 * @returns
 */

let findDirection = (str) => cDir.indexOf(str)

/**
 * Validates the parameters for placement
 * @param {*} arr
 * @returns
 */

const validateCheckParams = (arr) =>
    arr != [] && // array isn't empty
    arr.length == 3 && // array contains three elements
    isPositiveInt(arr[0]) && // element 0 is a positive integer or zero
    isPositiveInt(arr[1]) && // element 1 is a positive integer or zero
    typeof arr[2] == "string" && // element 2 is a string
    isValidDir(arr[2]) && // element 2 is a direction
    !isLessThanZero(+arr[0]) && // element 0 is equal to zero or above
    !isLessThanZero(+arr[1]) && // element 1 is equal to zero or above
    !isOutOfTableLimit(+arr[0], tableX) && // element 0 is not bigger than the table size
    !isOutOfTableLimit(+arr[1], tableY) // element 1 is not bigger than the table size

/**
 * Sets the placement
 * @param {*} item
 */

const place =  (item)=> {
    if (validateCheckParams(item[1])) {
        robotX = +item[1][0]
        robotY = +item[1][1]
        roboDirection = findDirection(item[1][2])
        isRobotPlaced = true
    }
}

/**
 * Turns the robot left or right.
 * @param {*} turn
 */

const turn =  (direction)=> {
    let newDir = (roboDirection + (direction == "LEFT" ? 3 : 1)) % 4
    roboDirection = newDir
}

/**
 * Checks to see if the robot can move in a certain direction
 * @returns
 */
//

const isValidMove = () => {
    switch (roboDirection) {
        case 0: // North
            return !isOutOfTableLimit(robotY + 1, tableY)
        case 1: // East
            return !isOutOfTableLimit(robotX + 1, tableX)
        case 2: // South
            return !isLessThanZero(robotY - 1)
        case 3: // West
            return !isLessThanZero(robotX - 1)
    }
}

/**
 * moveRobots the robot
 */

const moveRobot = () => {
    if (roboDirection % 2 == 1) {
        // If east or west
        if (roboDirection == 1) {
            // if east
            robotX++
        } else {
            robotX--
        }
    } else {
        if (roboDirection == 0) {
            // if north
            robotY++
        } else {
            robotY--
        }
    }
}

/**
 * Reports position and direction facing
 */
const report = () => {
    // eslint-disable-next-line no-undef
    console.log([robotX, robotY, cDir[roboDirection]].join(","))
}

/**
 * toyRobot  accepts the commands
 * @param {*} cmds
 */

// eslint-disable-next-line no-unused-vars
const toyRobot = (cmds) => {
    for (let i = 0; i < cmds.length; i++) {
        cmdSplit = cmds[i].toUpperCase().split(" ") //  split and converting commands to upper case
        if (cmdSplit.length == 2) {
            cmdSplit[1] = cmdSplit[1].split(",") // split command parameters
        } else {
            cmdSplit[1] = [] // default
        }
        commandTokens.push(cmdSplit)
    }

    // Step through the commands
    commandTokens.forEach(function (item) {
        switch (item[0]) {
            case "PLACE":
                place(item)
                break
            case "LEFT":
            case "RIGHT":
                isRobotPlaced ? turn(item[0]) : invalidCommandToken(item)
                break
            case "MOVE":
                isRobotPlaced && isValidMove() ? moveRobot() : invalidCommandToken(item)
                break
            case "REPORT":
                isRobotPlaced ? report() : invalidCommandToken(item)
                break
            default:
                invalidCommandToken(item)
                break
        }
    })
}

 


//Test Cases

 //toyRobot(["PLACE 2,3,NORTH", "MOVE", "REPORT"]) // 2,4,NORTH
 toyRobot(["PLACE 1,2,SOUTH","LEFT","REPORT"]) // 1,2,EAST

