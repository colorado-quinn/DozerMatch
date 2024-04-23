//import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import DozerCard from './DozerCard'
import { DozerInfo } from './types';

const fakeOnClick = function (dozerInfo: DozerInfo): void {
    throw new Error('Function not implemented.');
};
 
describe('DozerCard', () => {
  it('renders the provided text', () => {
    const testData: DozerInfo = {
        category: 'SuperDozer',
        engineHp: 500,
        engineHpString: 'powerString',
        makeName: 'm.brand',
        modelId: 'modelId',
        modelName: 'm.model_name',
        operatingWeightString: 'weigthString',
        operatingWeight: 5,
        imageUrl: 'http://fake.com',
    };

    const { getByText } = render(<DozerCard dozer={testData} onDozerClick={fakeOnClick }></DozerCard>)
 
    getByText('SuperDozer');
  })
})