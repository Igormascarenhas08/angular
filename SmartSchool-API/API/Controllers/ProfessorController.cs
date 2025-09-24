using API.Data;
using API.Models;
using Microsoft.AspNetCore.Connections.Features;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProfessorController : ControllerBase
    {
        private readonly IRepository _repo;

        public ProfessorController(IRepository repo)
        {
            _repo = repo;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var result = await _repo.GetAllProfessoresAsync(true);

                if (result == null)
                {
                    return NotFound();
                }

                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("{professorId}")]
        public async Task<IActionResult> GetByProfessorId(int professorId)
        {
            try
            {
                var professor = await _repo.GetProfessorAsyncById(professorId, false);

                if (professor == null)
                {
                    return NotFound();
                }

                return Ok(professor);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("ByAlunoId/{alunoId}")]
        public async Task<IActionResult> GetProfessorByAlunoId(int alunoId)
        {
            try
            {
                var professor = await _repo.GetProfessoresAsyncByAlunoId(alunoId, true);

                if (professor == null)
                {
                    return NotFound();
                }

                return Ok(professor);

            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost]
        public async Task<IActionResult> post(Professor model)
        {
            try
            {
                _repo.Add(model);

                if (await _repo.SaveChangesAsync())
                {
                    return Ok(model);
                }
                else
                {
                    return BadRequest("Erro Inesperado");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPut("{professorId}")]
        public async Task<IActionResult> put(int professorId, Professor model)
        {
            try
            {
                var professor = await _repo.GetProfessorAsyncById(professorId, true);

                if (professor == null)
                {
                    return NotFound();
                }

                _repo.Update(model);

                if (await _repo.SaveChangesAsync()) 
                {
                    return Ok(model);
                }

                return BadRequest("Erro Inesperado");
            }catch(Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpDelete("{professorId}")]
        public async Task<IActionResult> delete(int professorId)
        {
            try
            {
                var professor = await _repo.GetProfessorAsyncById(professorId, false);

                if(professor == null)
                {
                    return NotFound();
                }

                _repo.Delete(professor);

                if (await _repo.SaveChangesAsync()) 
                {
                    return Ok(new { mensage = "Deletado" });
                }

                return BadRequest("Erro Inesperado");

            }catch(Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}
