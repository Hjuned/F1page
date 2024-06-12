const { fetchData, getScheduleData, getResultData, getDriverData, getConstructorData, createRoundRaceResult } = require('../src/api');

global.fetch = jest.fn(() => Promise.resolve({
    json: () => Promise.resolve({}),
}));

describe('API Request Tests', () => {
    beforeEach(() => {
        fetch.mockClear();
    });

    test('fetchData should return correct data', async () => {
        const mockData = { data: 'some data' };
        fetch.mockImplementationOnce(() => Promise.resolve({
            json: () => Promise.resolve(mockData),
        }));

        const result = await fetchData('https://example.com/data');
        expect(result).toEqual(mockData);
        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith('https://example.com/data');
    });

    test('getScheduleData should return correct schedule data', async () => {
        const mockScheduleData = {
            MRData: {
                RaceTable: {
                    Races: [{ raceName: 'Bahrain Grand Prix' }]
                }
            }
        };
        fetch.mockImplementationOnce(() => Promise.resolve({
            json: () => Promise.resolve(mockScheduleData),
        }));

        const result = await getScheduleData();
        expect(result.MRData.RaceTable.Races[0].raceName).toBe('Bahrain Grand Prix');
        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith('https://ergast.com/api/f1/2023.json');
    });

    test('getResultData should return correct result data', async () => {
        const mockRaceResults = {
            MRData: {
                RaceTable: {
                    Races: [{
                        Results: [{ position: 1, Driver: { givenName: 'Lewis', familyName: 'Hamilton' } }]
                    }]
                }
            }
        };
        fetch.mockImplementation((url) => {
            if (url.endsWith('/1/results.json')) {
                return Promise.resolve({
                    json: () => Promise.resolve(mockRaceResults),
                });
            } else {
                return Promise.resolve({
                    json: () => Promise.resolve({ MRData: { RaceTable: { Races: [{ Results: [] }] } } }),
                });
            }
        });

        const result = await getResultData();
        expect(result[0][0].position).toBe(1);
        expect(result[0][0].Driver.givenName).toBe('Lewis');
        expect(result[0][0].Driver.familyName).toBe('Hamilton');
        expect(fetch).toHaveBeenCalledTimes(22);
    });

    test('getDriverData should return correct driver standings', async () => {
        const mockDriverData = {
            MRData: {
                StandingsTable: {
                    StandingsLists: [{ DriverStandings: [{ position: 1, Driver: { givenName: 'Max', familyName: 'Verstappen' } }] }]
                }
            }
        };
        fetch.mockImplementationOnce(() => Promise.resolve({
            json: () => Promise.resolve(mockDriverData),
        }));

        const result = await getDriverData();
        expect(result.MRData.StandingsTable.StandingsLists[0].DriverStandings[0].Driver.givenName).toBe('Max');
        expect(result.MRData.StandingsTable.StandingsLists[0].DriverStandings[0].Driver.familyName).toBe('Verstappen');
        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith('https://ergast.com/api/f1/2023/driverStandings.json');
    });

    test('getConstructorData should return correct constructor standings', async () => {
        const mockConstructorData = {
            MRData: {
                StandingsTable: {
                    StandingsLists: [{ ConstructorStandings: [{ position: 1, Constructor: { name: 'Red Bull' } }] }]
                }
            }
        };
        fetch.mockImplementationOnce(() => Promise.resolve({
            json: () => Promise.resolve(mockConstructorData),
        }));

        const result = await getConstructorData();
        expect(result.MRData.StandingsTable.StandingsLists[0].ConstructorStandings[0].Constructor.name).toBe('Red Bull');
        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith('https://ergast.com/api/f1/2023/constructorStandings.json');
    });

    test('createRoundRaceResult should return correct round race results', async () => {
        const mockScheduleData = {
            MRData: {
                RaceTable: {
                    Races: [{ raceName: 'Bahrain Grand Prix' }]
                }
            }
        };
        const mockRaceResults = {
            MRData: {
                RaceTable: {
                    Races: [{
                        Results: [{ position: 1, Driver: { givenName: 'Lewis', familyName: 'Hamilton' } }]
                    }]
                }
            }
        };
        
        fetch.mockImplementationOnce(() => Promise.resolve({
            json: () => Promise.resolve(mockScheduleData),
        }));
        fetch.mockImplementation(() => Promise.resolve({
            json: () => Promise.resolve(mockRaceResults),
        }));

        const result = await createRoundRaceResult();
        expect(result[0][0]).toEqual('Bahrain Grand Prix');
        expect(result[0][1][0]).toEqual({ position: '1. Lewis Hamilton' });
    });
});
