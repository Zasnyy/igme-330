type Grade = 'A' | 'B' | 'C' | 'D' | 'F';

type ProspectiveStudent = {
    name: string,
    equipment: string[]
};

type GradStudent = {
    name: string,
    grade: Grade
};

type UndergradStudent = {
    name: string,
    equipment: string[],
    grade: Grade
};

type AbsentStudent = {
    name: string,
    equipment: string[],
    leaveDate: {
        month: number,
        year: number
    }
};

type TA = {
    equipment: string[],
    classesTheyTeach: string[]
};

type Student = ProspectiveStudent | GradStudent 
             | UndergradStudent | AbsentStudent 
             | TA;

const prospectiveJeff: ProspectiveStudent = {
    name: 'Jeff',
    equipment: ['Hope and optimism', 'burgeoning fear']
};


const students: Student[] = [
    {
        name: 'Travis',
        grade: 'C',
        equipment: ['Staff of Awesome', 'Pebble of Unending Suffering']
    },
    {
        name: 'Charlie',
        grade: 'A',
        equipment: []
    },
    {
        name: 'Kady',
        grade: 'B',
        equipment: ['Wand of Being a Youngest Child']
    },
];

// const giveKnife = (student: Student) => {
//     student.equipment.push('knife');
// };