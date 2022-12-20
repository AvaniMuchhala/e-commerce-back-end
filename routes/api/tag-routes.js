const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// GET request to find all tags and include its associated Product data
router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product, through: ProductTag }]
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET Request to find a single tag by its `id` and include its associated Product data
router.get('/:id', async (req, res) => {
  try {
    // Check if ID provided in URL
    if (req.params.id) {
      const tagData = await Tag.findByPk(req.params.id, {
        include: [{ model: Product, through: ProductTag }]
      });
  
      // Check if tag with specified ID found
      if (tagData) {
        res.status(200).json(tagData);
      } else {
        res.status(404).json({ message: 'No tag found with this ID!' });
      }
    } else {
      res.status(400).json({ message: 'No tag ID provided!' });
    }
    
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST Request to create a new tag
router.post('/', async (req, res) => {
  try {
    // Check if req.body has 'tag_name' property
    if (req.body.tag_name) {
      const tagData = await Tag.create({
        tag_name: req.body.tag_name
      });
      res.status(200).json(tagData);
    } else {
      res.status(400).json({ message: 'Please supply req.body as object with `tag_name` property.' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// PUT Request to update a tag's name by its `id` value
router.put('/:id', async (req, res) => {
  try {
    // Check that ID is provided in URL and tag_name is specified in req.body
    if (req.params.id) {
      if (req.body.tag_name) {
        const tagData = await Tag.update(req.body, {
          where: {
            id: req.params.id
          }
        });
  
        if (tagData[0]) {
          res.status(200).json(tagData);
        } else {
          res.status(404).json({message: 'No tag found with this ID!'});
        }

      } else {
        res.status(400).json({ message: 'Please supply req.body as object with `tag_name` property.' });
      }
    } else {
      res.status(400).json({message: 'No tag ID provided!' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE Request to delete a tag by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    if (req.params.id) {
      const tagData = await Tag.destroy({
        where: {
          id: req.params.id
        }
      });

      // Check if tag found with specified ID
      if (tagData) {
        res.status(200).json(tagData);
      } else {
        res.status(404).json({ message: 'No tag found with this ID!' });
      }      
    } else {
      res.status(400).json({ message: 'No tag ID provided!' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
