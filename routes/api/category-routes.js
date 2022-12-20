const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// GET Request to find all categories and include its associated Products
router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product}]
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET Request to find one category by its `id` value and include its associated Products
router.get('/:id', async (req, res) => {
  try {
    // Check if category ID provided in URL
    if (req.params.id) {
      const categoryData = await Category.findByPk(req.params.id, {
        include: [{ model: Product }]
      });
      
      // Check if category with provided ID was found
      if (categoryData) {
        res.status(200).json(categoryData);
      } else {
        res.status(404).json({ message: 'No category found with this ID!' });
      }

    } else {
      res.status(404).json({ message: 'Category ID not provided!' });
    }
  } catch (err) {
    res.status(500).json(err);
  } 
});

// POST Request to create a new category
router.post('/', async (req, res) => {
  try {
    // Check if req.body has 'category_name' property defined
    if (req.body.category_name) {
      const categoryData = await Category.create(req.body);
      res.status(201).json(categoryData);
    } else {
      res.status(400).json({ message: 'Please supply req.body as object with `category_name` property.'});
    }    
  } catch (err) {
    res.status(500).json(err);
  }
});

// PUT Request to update a category by its `id` value
router.put('/:id', async (req, res) => {
  try {
    // Check that ID is provided in URL and category_name is specified in req.body
    if (req.params.id) {
      if (req.body.category_name) {
        const categoryData = await Category.update(req.body, {
          where: {
            id: req.params.id
          }
        });
  
        // Check how many rows affected by the update (0 or 1)
        if (categoryData[0]) {
          res.status(200).json(categoryData);
        } else {
          res.status(404).json({ message: 'No category found with this ID, or you already updated this category!' });
        }
      } else {
        res.status(400).json({ message: 'Please supply req.body as object with `category_name` property.' });
      }
      
    } else {
      res.status(400).json({ message: 'Category ID not provided!' });
    }
    
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE Request to delete a category by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    if (req.params.id) {
      const categoryData = await Category.destroy({
        where: {
          id: req.params.id
        }
      });

      // Check how many rows affected (0 for none, 1 for 1 row deleted)
      if (categoryData) {
        res.status(200).json(categoryData);
      } else {
        res.status(404).json({message: 'No category found with this ID!'});
      }
    } else {
      res.status(400).json({message: 'Category ID not provided!'});
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
