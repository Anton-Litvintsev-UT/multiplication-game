import { Table } from "antd";
import FooterNavigation from "../components/FooterNavigation";

// dummy values for testing
const dataSource = [
  {
    key: '1',
    rank: 1,
    name: 'Mike',
    difficulty: 3,
    correct: 32,
    incorect: 1,
    points: 100,
  },
  {
    key: '2',
    rank: 2,
    name: 'Sarah',
    difficulty: 4,
    correct: 29,
    incorect: 3,
    points: 95,
  },
  {
    key: '3',
    rank: 3,
    name: 'John',
    difficulty: 2,
    correct: 27,
    incorect: 2,
    points: 90,
  },
  {
    key: '4',
    rank: 4,
    name: 'Emma',
    difficulty: 5,
    correct: 25,
    incorect: 4,
    points: 88,
  },
  {
    key: '5',
    rank: 5,
    name: 'David',
    difficulty: 3,
    correct: 24,
    incorect: 5,
    points: 84,
  },
  {
    key: '6',
    rank: 6,
    name: 'Olivia',
    difficulty: 4,
    correct: 22,
    incorect: 3,
    points: 80,
  },
  {
    key: '7',
    rank: 7,
    name: 'James',
    difficulty: 2,
    correct: 21,
    incorect: 6,
    points: 76,
  },
  {
    key: '8',
    rank: 8,
    name: 'Sophia',
    difficulty: 5,
    correct: 19,
    incorect: 4,
    points: 72,
  },
  {
    key: '9',
    rank: 9,
    name: 'Daniel',
    difficulty: 3,
    correct: 18,
    incorect: 7,
    points: 68,
  },
  {
    key: '10',
    rank: 10,
    name: 'Isabella',
    difficulty: 4,
    correct: 16,
    incorect: 5,
    points: 64,
  }
];

const columns = [
  {
    title: 'Rank',
    dataIndex: 'rank',
    key: 'rank',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Difficulty',
    dataIndex: 'difficulty',
    key: 'difficulty',
  },
  {
    title: 'Correct',
    dataIndex: 'correct',
    key: 'correct',
  },
  {
    title: 'Incorect',
    dataIndex: 'incorect',
    key: 'incorect',
  },
  {
    title: 'Points',
    dataIndex: 'points',
    key: 'points',
  },
];

export default function RecordsPage() {
  return (
    <div className="flex flex-col items-center p-8 gap-6">
      <Table dataSource={dataSource} columns={columns} />
      <FooterNavigation />
    </div>
  )
}
