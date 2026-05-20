export const mockFacilities = [
{
  id: 1,
  name: 'GreenTech E-Waste Center',
  type: 'e-waste',
  distance: '1.2 km',
  accepted: ['Batteries', 'Phones', 'Laptops'],
  hours: '9:00 AM - 5:00 PM',
  lat: 14.5995,
  lng: 120.9842
},
{
  id: 2,
  name: 'Barangay San Lorenzo Drop-off',
  type: 'recycling',
  distance: '0.8 km',
  accepted: ['Plastic', 'Paper', 'Glass'],
  hours: '8:00 AM - 4:00 PM',
  lat: 14.5547,
  lng: 121.0244
},
{
  id: 3,
  name: 'Goodwill Donation Hub',
  type: 'donation',
  distance: '2.5 km',
  accepted: ['Clothes', 'Books', 'Furniture'],
  hours: '10:00 AM - 6:00 PM',
  lat: 14.5826,
  lng: 121.0623
}];


export const mockResources = [
{
  id: 1,
  title: 'How to turn plastic bottles into planters',
  category: 'DIY',
  time: '5 min read',
  icon: 'Sprout'
},
{
  id: 2,
  title: 'Repairing a frayed charging cable',
  category: 'Repair',
  time: '10 min video',
  icon: 'Wrench'
},
{
  id: 3,
  title: 'The hidden cost of fast fashion',
  category: 'Articles',
  time: '8 min read',
  icon: 'BookOpen'
},
{
  id: 4,
  title: 'Composting 101 for Urban Homes',
  category: 'Videos',
  time: '15 min video',
  icon: 'Leaf'
}];


export const mockSuggestions = {
  plasticBottle: {
    item: 'Plastic Bottle · PET #1',
    confidence: 96,
    condition: 'Reusable',
    reuse: [
    {
      title: 'Vertical Garden',
      desc: 'Cut in half to create hanging planters.',
      icon: 'Sprout'
    },
    {
      title: 'Drip Irrigation',
      desc: 'Poke holes in the cap for slow watering.',
      icon: 'Droplets'
    },
    {
      title: 'Pen Holder',
      desc: 'Decorate the base for desk organization.',
      icon: 'PenTool'
    }],

    repair: [],
    donate: [],
    recycle: 'Rinse and crush before placing in the blue bin.',
    impact: '0.08'
  },
  smartphone: {
    item: 'Smartphone · Lithium Battery',
    confidence: 99,
    condition: 'Damaged',
    hazard: 'High',
    reuse: [],
    repair: [
    {
      title: 'Screen Replacement',
      desc: 'Visit an authorized repair center.',
      icon: 'Wrench'
    }],

    donate: [
    {
      title: 'Tech for Schools',
      desc: 'Donate old working phones for education.',
      icon: 'Heart'
    }],

    recycle: 'Do NOT throw in regular trash. Take to certified e-waste center.',
    impact: '45.5'
  }
};